<?php

namespace App\Http\Controllers;

use App\Models\CosmeticsSale;
use App\Models\CosmeticsWarehouse;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CosmeticsSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request['date'] = Carbon::parse($request->date)->format('Y-m-d');
            $warehouse = CosmeticsWarehouse::where('id', $request->cosmetics_warehouse_id)->first();
            if (!$warehouse) {
                return response()->json(['message' => 'Nema podataka u magacinu!'], 400);
            }

            if ($warehouse->quantity < $request->quantity) {
                return response()->json(['message' => 'Nema dovoljno na stanju. Na raspolaganju imate ' . $warehouse->quantity], 400);
            }

            $request['cosmetics_id'] = $warehouse->cosmetics_id;
            $total = $request->sell_price * $request->quantity;

            $sale = CosmeticsSale::create([
                'cosmetics_warehouse_id' => $request->cosmetics_warehouse_id,
                'quantity' => $request->quantity,
                'sell_price' => $request->sell_price,
                'date' => $request->date,
                'cosmetics_id' => $request->cosmetics_id,
                'total' => $total
            ]);

            if (!$sale) {
                return response()->json(['message' => 'Desila se greška! Molimo Vas pokušajte ponovo!'], 400);
            }
            $sale->load('cosmetics');
            return response()->json(['message' => 'Uspješno ste unijeli prodaju!', 'sale' => $sale], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Greška!' . $e->getMessage()], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {

            //starting transaction
            DB::beginTransaction();

            $cosmetic_sale = CosmeticsSale::find($id);
            if (!$cosmetic_sale) {
                return response()->json(['message' => 'Nema podataka za ovu prodaju!'], 400);
            }

            $validate_request = $request->validate([
                'cosmetics_warehouse_id' => 'required|integer',
                'quantity' => 'required|numeric',
                'sell_price' => 'required|numeric',
                'date' => 'required'
            ]);

            $validate_request['date'] = Carbon::parse($request->date)->format('Y-m-d');
            $warehouse = CosmeticsWarehouse::where('id', $validate_request['cosmetics_warehouse_id'])->first();

            if (!$warehouse) {
                return response()->json(['message' => 'Nema podataka u magacinu!'], 400);
            }

            $validate_request['cosmetics_id'] = $warehouse->cosmetics_id;
            $validate_request['total'] = $validate_request['quantity'] * $validate_request['sell_price'];

            if ($validate_request['quantity'] > $warehouse->quantity + $cosmetic_sale->quantity) {
                return response()->json(['message' => 'Nema dovoljno na stanju.'], 400);
            }

            $warehouse_new_quantity = ($warehouse->quantity + $cosmetic_sale->quantity) - $validate_request['quantity'];

            $cosmetic_sale->update($validate_request);
            $cosmetic_sale->load('cosmetics');

            $warehouse->update([
                'quantity' => $warehouse_new_quantity
            ]);

            //commiting transaction
            DB::commit();

            return response()->json(['message' => 'Uspješno ste ažurirali prodaju', 'sale' => $cosmetic_sale], 200);
        } catch (Exception $e) {
            //rolback transaction
            DB::rollBack();
            return response()->json(['message' => 'Desila se greška! Pokušajte ponovo!' . $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($sale_id)
    {
        try {
            $cosmetics_sales = CosmeticsSale::findOrFail($sale_id);
            $cosmetics_sales->delete();
            return response()->json(['message' => 'Uspješno ste obrisali prodaju', 'sale' => []], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Desila se greška! Pokušajte ponovo!' . $e->getMessage()]);
        }
    }

    public function getSalesData(Request $request)
    {
        $month = Carbon::parse($request->date)->month;
        $sales = CosmeticsSale::with('cosmetics')->whereMonth('date', $month)->get();

        if ($sales->isEmpty()) {
            return response()->json(['message' => 'Nema podataka za ovaj datum', 'sales' => $sales], 200);
        }

        return response()->json(['sales' => $sales], 200);
    }
}
