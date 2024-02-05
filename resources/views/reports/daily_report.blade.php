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
    <?php $total_appointments_price = 0; ?>
    <div class="container">
        <h1>IZVJEŠTAJ ZA {{$data['date']}}</h1>
        <table>
            <tr>
                <th>Barber </th>
                <th>Zarada </th>
            </tr>
            @foreach ($data['appointments'] as $item)
            <?php $total_appointments_price += $item->price; ?>
                <tr> 
                    <td>
                        {{ $item->user->first_name }}
                    </td>
                    <td>
                        {{ $item->price }}
                    </td>
                </tr>
            @endforeach
            <tr style="background: lightskyblue;">
                <td>
                    <b>Kozmetika:</b>
                </td>
                <td>
                    {{$data['cosmetics_price']}}
                </td>
            </tr>
            <tr style="background: lightgreen">
                <td>
                    <b>Ukupno:</b>
                </td>
                <td>
                    {{$total_appointments_price + $data['cosmetics_price']}}
                </td>
            </tr>
        </table>
    </div>
</body>
</html>