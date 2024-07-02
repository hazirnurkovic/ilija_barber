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
    <div class="container">
        @if(isset($data['date']))
            <h1>IZVJEŠTAJ ZA {{$data['date']}}</h1>
        @else
            <h1>IZVJEŠTAJ ZA datum od {{$data['start_date']}} do {{$data['end_date']}}</h1>
        @endif
        
        <table>
            <tr>
                <th>Barber </th>
                <th>Ukupna zarada</th>
                <th>Zarada za barbera</th>
                <th>Zarada za salon</th>
            </tr>
            @foreach ($data['earnings']['barber_shop_earnings'] as $item)
                <tr>
                    <td>{{ $item['user']['first_name']}} {{ $item['user']['last_name'] }}</td>
                    <td>{{ $item['total' ]}}</td>
                    <td>{{ $item['barber_total'] }}</td>
                    <td>{{ $item['barber_shop_earning'] }}</td>
                </tr>
            @endforeach
        </table>

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
                <tr>
                    <td>{{$sale['cosmetics']['name']}}</td>
                    <td>{{$sale['quantity']}}</td>
                    <td>{{$sale['cosmetics_warehouse']['purchase_price']}}</td>
                    <td>{{$sale['sell_price']}}</td>
                    <td>{{$sale['total']}}</td>
                    <td>{{$sale['sell_price'] - $sale['cosmetics_warehouse']['purchase_price']}}</td>
                </tr>
            @endforeach
        </table>

        <h2>Troškovi</h2>
        <table>
            <tr>
                <th>Naziv troška</th>
                <th>Cijena</th>
            </tr>
            @foreach ($data['expenses'] as $expense)
                <tr>
                    <td>{{$expense['name']}}</td>
                    <td>{{$expense['price']}}</td>
                </tr>
            @endforeach
            <tr>
                <td>Ukupno:</td>
                <td>{{$data['finances'][0]['expense_amount']}}</td>
            </tr>
        </table>

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
                    <td>{{$finance['total']}}</td>
                    <td>{{$finance['register_amount']}}</td>
                    <td>{{$finance['cash_amount']}}</td>
                    <td>{{$finance['expense_amount']}}</td>
                    <td>{{$finance['envelope']}}</td>
                </tr>
            @endforeach
        </table>
    </div>
</body>
</html>