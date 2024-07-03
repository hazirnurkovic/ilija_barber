<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Dnevni izvještaj</title>
    <style>
        h1 {
            text-align: center; /* Center the text horizontally */
            margin-top: 0; /* Remove default margin */
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:nth-child(odd) {
            background-color: #f2f2f2;
        }

    </style>
</head>
<body>
    <?php 
        $total_expenses = 0;
        $total_earnings = 0;
        $total_barber = 0;
        $total_shop = 0;
        $quantity = 0;
        $purchase_price = 0;
        $sell_price = 0;
        $total_sell_price = 0;
        $total_earning_per_unit = 0;
    ?>
    <div class="container">
        @if(isset($data['date']))
            <h1>IZVJEŠTAJ ZA {{$data['date']}}</h1>
        @else
            <h1>IZVJEŠTAJ ZA datum od {{$data['start_date']}} do {{$data['end_date']}}</h1>
        @endif
        
        @if (isset($data['earnings']['barber_shop_earnings']))
            <table>
                <tr>
                    <th>Barber </th>
                    <th>Ukupna zarada</th>
                    <th>Zarada za barbera</th>
                    <th>Zarada za salon</th>
                </tr>
                @foreach ($data['earnings']['barber_shop_earnings'] as $item)
                    <?php 
                        $total_earnings += $item['total'] ?? 0;
                        $total_barber += $item['barber_total'] ?? 0;
                        $total_shop += $item['barber_shop_earning'] ?? 0;
                    ?>
                    <tr>
                        <td>{{ $item['user']['first_name'] ?? 'N/A' }} {{ $item['user']['last_name'] ?? 'N/A' }}</td>
                        <td>{{ $item['total'] ?? 'N/A' }}</td>
                        <td>{{ $item['barber_total'] ?? 'N/A' }}</td>
                        <td>{{ $item['barber_shop_earning'] ?? 'N/A' }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td>UKUPNO:</td>
                    <td>{{$total_earnings}}</td>
                    <td>{{$total_barber}}</td>
                    <td>{{$total_shop}}</td>
                </tr>
            </table>
        @endif

        @if (isset($data['cosmetics_sales']))
            <h2>Prodata kozmetika</h2>
            <table>
                <tr>
                    <th>Artikal</th>
                    <th>Kolicina prodaje</th>
                    <th>Nabavna cijena</th>
                    <th>Prodajna cijena</th>
                    <th>Ukupna prodaja</th>
                    <th>Zarada po komadu</th>
                </tr>
                @foreach ($data['cosmetics_sales'] as $sale)
                    <?php 
                        $quantity += $sale['quantity'] ?? 0;
                        $purchase_price += $sale['cosmetics_warehouse']['purchase_price'] ?? 0;
                        $sell_price += $sale['sell_price'] ?? 0;
                        $total_sell_price += $sale['total'] ?? 0;
                        $total_earning_per_unit += ($sale['sell_price'] ?? 0) - ($sale['cosmetics_warehouse']['purchase_price'] ?? 0);
                    ?>
                    <tr>
                        <td>{{ $sale['cosmetics']['name'] ?? 'N/A' }}</td>
                        <td>{{ $sale['quantity'] ?? 'N/A' }}</td>
                        <td>{{ $sale['cosmetics_warehouse']['purchase_price'] ?? 'N/A' }}</td>
                        <td>{{ $sale['sell_price'] ?? 'N/A' }}</td>
                        <td>{{ $sale['total'] ?? 'N/A' }}</td>
                        <td>{{ ($sale['sell_price'] ?? 0) - ($sale['cosmetics_warehouse']['purchase_price'] ?? 0) }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td>UKUPNO:</td>
                    <td>{{$quantity}}</td>
                    <td>{{$purchase_price}}</td>
                    <td>{{$sell_price}}</td>
                    <td>{{$total_sell_price}}</td>
                    <td>{{$total_earning_per_unit}}</td>
                </tr>
            </table>
        @endif

        @if (isset($data['expenses']))
            <h2>Troškovi</h2>
            <table>
                <tr>
                    <th>Naziv troška</th>
                    <th>Cijena</th>
                </tr>
                @foreach ($data['expenses'] as $expense)
                <?php $total_expenses += $expense['price'] ?? 0; ?>
                    <tr>
                        <td>{{ $expense['name'] ?? 'N/A' }}</td>
                        <td>{{ $expense['price'] ?? 'N/A' }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td>Ukupno:</td>
                    <td>{{$total_expenses}}</td>
                </tr>
            </table>
        @endif

        @if (isset($data['finances']))
            <h2>Pregled finansija za danas: </h2>
            <table>
                <tr>
                    <th>Ukupan iznos pazara salona sa prodatom kozmetikom</th>
                    <th>Kucani iznos</th>
                    <th>Keš</th>
                    <th>Rashod</th>
                    <th>Koverta</th>
                </tr>
                @foreach ($data['finances'] as $finance)
                    <tr>
                        <td>{{ $finance['total'] ?? 'N/A' }}</td>
                        <td>{{ $finance['register_amount'] ?? 'N/A' }}</td>
                        <td>{{ $finance['cash_amount'] ?? 'N/A' }}</td>
                        <td>{{ $finance['expense_amount'] ?? 'N/A' }}</td>
                        <td>{{ $finance['envelope'] ?? 'N/A' }}</td>
                    </tr>
                @endforeach
            </table>
        @endif
    </div>
</body>
</html>