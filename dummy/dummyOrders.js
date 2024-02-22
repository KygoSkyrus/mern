const dummyOrders = [
    {
        "_id": "651d98821a32ab8b50a2a2ef",
        "orderId": "0b2e13f6-1411-4675-a469-7c5c9f3e3e04",
        "tax": 63089,
        "shipping": 0,
        "payment_status": "paid",
        "receiptUrl": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmh2a3BTSkRFVk56cVhsKJew9qgGMgYYC-tVXXU6LBZsyQ5p_yrE3ln_Spl7xkgE6xhINaAAQMPsUsaauBjjxFyoM0Mb2XSxW2Ms",
        "user": {
            "address": {
                "house": "somewhere out there",
                "street": "near andromeda",
                "state": "Goa",
                "city": "Bambolim",
                "pincode": "121233",
                "country": "India"
            },
            "_id": "64dca5854563a04dffe7cd9b",
            "firstname": "ankit",
            "lastname": "rohilla",
            "avtar": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(17).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c",
            "email": "ankitrohilla@email.com",
            "phone": 273974328,
            "id": "64dca5854563a04dffe7cd9b"
        },
        "products": [
            {
                "productId": "64c6a642c8b5667ef02f36dc",
                "name": "Blue-Horn Smart Tank 529 All-in-one Colour Printer",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fbe99951d-6c1d-4aaf-b21e-72dc8f3121dd?alt=media&token=4b4d7e74-be7b-42e0-a5e5-8b77160ebc50",
                "quantity": 9,
                "discount": 0,
                "price": 8999,
                "_id": "651d98821a32ab8b50a2a2f0"
            },
            {
                "productId": "64c7512b10ceb052b95b0386",
                "name": "IdeaTek i5 CPU",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F02c8c4e1-d199-44ef-9aae-1f993182945f?alt=media&token=b98b0ea8-9b4e-4599-b954-4a81ee70c8f7",
                "quantity": 1,
                "discount": 0,
                "price": 49999,
                "_id": "651d98821a32ab8b50a2a2f1"
            },
            {
                "productId": "64c74b6010ceb052b95b037e",
                "name": "Globex M77 All-in-one Computer",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F69333c2f-bb4f-40ed-8846-b332e802caa0?alt=media&token=71fe7679-76c4-4fa8-b5e6-cd7a1f8ecff0",
                "quantity": 5,
                "discount": 0,
                "price": 59100,
                "_id": "651d98821a32ab8b50a2a2f2"
            },
            {
                "productId": "64ca25ac8f6af900849dfbb2",
                "name": "Globex 700W smart solo Microwave oven ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Ff1b65308-8318-43b5-a098-9e9c48e9cdbb?alt=media&token=5d9a85ff-dcf1-4578-a750-2ed7e8772b9e",
                "quantity": 1,
                "discount": 0,
                "price": 5000,
                "_id": "651d98821a32ab8b50a2a2f3"
            },
            {
                "productId": "64c69d66c8b5667ef02f36c5",
                "name": "Redmi A2 (Sea Green, 2GB RAM, 32GB Storage)",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fc0dfeda0-f36d-4c4c-8fd0-74e94220e570?alt=media&token=fa8691b3-9d53-45a8-aced-2f92c435a379",
                "quantity": 7,
                "discount": 0,
                "price": 6000,
                "_id": "651d98821a32ab8b50a2a2f4"
            },
            {
                "productId": "64c698900ef6832aa59e93bb",
                "name": "Apple 2023 MacBook Air Laptop M1 chip",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F7ba318cc-06fb-4940-962b-c1892738b40f?alt=media&token=fa8e4769-758c-4758-ab56-579ba1be8128",
                "quantity": 2,
                "discount": 50,
                "price": 90000,
                "_id": "651d98821a32ab8b50a2a2f5"
            },
            {
                "productId": "64c757f810ceb052b95b039e",
                "name": "EXO MP3 Player",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F9df80e24-9a2f-4679-b74f-950e07eff5de?alt=media&token=e11a41d4-e680-4648-84af-a01537b34f43",
                "quantity": 1,
                "discount": 0,
                "price": 45899,
                "_id": "651d98821a32ab8b50a2a2f6"
            },
            {
                "productId": "64ca5fc0953bcfba730dc0a2",
                "name": "Cerberus GeForce GTX 1050 4GB Gaming Graphics Card ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fe402f412-dc64-4f48-a25d-8f77d41ebe47?alt=media&token=cca08095-ccec-43db-81a9-4e59c0886501",
                "quantity": 1,
                "discount": 0,
                "price": 1500,
                "_id": "651d98821a32ab8b50a2a2f7"
            },
            {
                "productId": "64c6a234c8b5667ef02f36cf",
                "name": "Sony WH-CH520, Wireless On-Ear Bluetooth Headphones with Mic",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F8175b06d-714e-46be-8b0f-4e704acf8a31?alt=media&token=6f19ac90-41e2-4e7d-b935-14dbfaf2e4e0",
                "quantity": 1,
                "discount": 0,
                "price": 6000,
                "_id": "651d98821a32ab8b50a2a2f8"
            },
            {
                "productId": "64c9e8a38f6af900849dfb93",
                "name": "Sky 65 Drone ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fb3758d1e-43ff-47e1-8cfe-1aab7f8e5c0c?alt=media&token=86bda328-05bb-4d86-9a46-d85bedd23fe7",
                "quantity": 1,
                "discount": 0,
                "price": 13999,
                "_id": "651d98821a32ab8b50a2a2f9"
            }
        ],
        "totalAmount": 693977,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-10-04T16:53:22.798Z",
        "__v": 0
    },
    {
        "shippingAddress": {
            "line1": "Guru Gobind Singh Marg",
            "line2": "32",
            "city": "fds",
            "postal_code": "332342",
            "state": "KL",
            "country": "IN"
        },
        "_id": "65368697950245dc15eebc15",
        "orderId": "aa6a174f-944e-40c8-8b66-a5c7c5ef71f8",
        "tax": 62039,
        "shipping": 0,
        "payment_status": "paid",
        "receiptUrl": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmh2a3BTSkRFVk56cVhsKKSM2qkGMgaQ8JWCSU46LBbvweEs3kUWUy_5rIoFr77fa0D_KEXnKaSLkUl4M8QslR4aUe3mJOJjO6Tk",
        "user": {
            "address": {
                "house": "somewhere out there",
                "street": "near andromeda",
                "state": "Goa",
                "city": "Bambolim",
                "pincode": "121233",
                "country": "India"
            },
            "_id": "64dca5854563a04dffe7cd9b",
            "firstname": "raghav",
            "lastname": "singh",
            "avtar": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(19).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c",
            "email": "singhraghav@email.com",
            "phone": 273974328,
            "id": "64dca5854563a04dffe7cd9b"
        },
        "products": [
            {
                "productId": "64c6a642c8b5667ef02f36dc",
                "name": "Blue-Horn Smart Tank 529 All-in-one Colour Printer",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fbe99951d-6c1d-4aaf-b21e-72dc8f3121dd?alt=media&token=4b4d7e74-be7b-42e0-a5e5-8b77160ebc50",
                "quantity": 9,
                "discount": 0,
                "price": 8999,
                "_id": "65368697950245dc15eebc16"
            },
            {
                "productId": "64c7512b10ceb052b95b0386",
                "name": "IdeaTek i5 CPU",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F02c8c4e1-d199-44ef-9aae-1f993182945f?alt=media&token=b98b0ea8-9b4e-4599-b954-4a81ee70c8f7",
                "quantity": 1,
                "discount": 0,
                "price": 49999,
                "_id": "65368697950245dc15eebc17"
            },
            {
                "productId": "64c74b6010ceb052b95b037e",
                "name": "Globex M77 All-in-one Computer",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F69333c2f-bb4f-40ed-8846-b332e802caa0?alt=media&token=71fe7679-76c4-4fa8-b5e6-cd7a1f8ecff0",
                "quantity": 5,
                "discount": 0,
                "price": 59100,
                "_id": "65368697950245dc15eebc18"
            },
            {
                "productId": "64ca25ac8f6af900849dfbb2",
                "name": "Globex 700W smart solo Microwave oven ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Ff1b65308-8318-43b5-a098-9e9c48e9cdbb?alt=media&token=5d9a85ff-dcf1-4578-a750-2ed7e8772b9e",
                "quantity": 1,
                "discount": 0,
                "price": 5000,
                "_id": "65368697950245dc15eebc19"
            },
            {
                "productId": "64ca5d7a953bcfba730dc09a",
                "name": "McAfee Total Protection Antivirus 2023 ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fb554934d-37f8-4a53-860a-d13d124a5654?alt=media&token=dd0a87d5-46b9-4aa9-b09d-88ec660cd0f0",
                "quantity": 1,
                "discount": 0,
                "price": 1500,
                "_id": "65368697950245dc15eebc1a"
            },
            {
                "productId": "64c69d66c8b5667ef02f36c5",
                "name": "Redmi A2 (Sea Green, 2GB RAM, 32GB Storage)",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fc0dfeda0-f36d-4c4c-8fd0-74e94220e570?alt=media&token=fa8691b3-9d53-45a8-aced-2f92c435a379",
                "quantity": 5,
                "discount": 0,
                "price": 6000,
                "_id": "65368697950245dc15eebc1b"
            },
            {
                "productId": "64c698900ef6832aa59e93bb",
                "name": "Apple 2023 MacBook Air Laptop M1 chip",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F7ba318cc-06fb-4940-962b-c1892738b40f?alt=media&token=fa8e4769-758c-4758-ab56-579ba1be8128",
                "quantity": 2,
                "discount": 50,
                "price": 90000,
                "_id": "65368697950245dc15eebc1c"
            },
            {
                "productId": "64c757f810ceb052b95b039e",
                "name": "EXO MP3 Player",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F9df80e24-9a2f-4679-b74f-950e07eff5de?alt=media&token=e11a41d4-e680-4648-84af-a01537b34f43",
                "quantity": 1,
                "discount": 0,
                "price": 45899,
                "_id": "65368697950245dc15eebc1d"
            },
            {
                "productId": "64ca5fc0953bcfba730dc0a2",
                "name": "Cerberus GeForce GTX 1050 4GB Gaming Graphics Card ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fe402f412-dc64-4f48-a25d-8f77d41ebe47?alt=media&token=cca08095-ccec-43db-81a9-4e59c0886501",
                "quantity": 1,
                "discount": 0,
                "price": 1500,
                "_id": "65368697950245dc15eebc1e"
            },
            {
                "productId": "64c6a234c8b5667ef02f36cf",
                "name": "Sony WH-CH520, Wireless On-Ear Bluetooth Headphones with Mic",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F8175b06d-714e-46be-8b0f-4e704acf8a31?alt=media&token=6f19ac90-41e2-4e7d-b935-14dbfaf2e4e0",
                "quantity": 1,
                "discount": 0,
                "price": 6000,
                "_id": "65368697950245dc15eebc1f"
            },
            {
                "productId": "64c9e8a38f6af900849dfb93",
                "name": "Sky 65 Drone ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fb3758d1e-43ff-47e1-8cfe-1aab7f8e5c0c?alt=media&token=86bda328-05bb-4d86-9a46-d85bedd23fe7",
                "quantity": 1,
                "discount": 0,
                "price": 13999,
                "_id": "65368697950245dc15eebc20"
            }
        ],
        "totalAmount": 682427,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-10-23T14:43:35.293Z",
        "__v": 0
    },
    {
        "shippingAddress": {
            "line1": "Guru Gobind Singh Marg",
            "line2": "rew",
            "city": "32",
            "postal_code": "323233",
            "state": "KL",
            "country": "IN"
        },
        "_id": "65368ea3671f3d87b141fbb7",
        "orderId": "d2b67c1d-4573-4cec-b034-0c7b5bdf5da4",
        "tax": 44940,
        "shipping": 0,
        "payment_status": "paid",
        "receiptUrl": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmh2a3BTSkRFVk56cVhsKLCc2qkGMgY4SQtuOeo6LBayeUAdrCvOIC97ypxFdFkLBYpFEdQV5_fwaLVtC3bfSKmAXsXRUNnUzftI",
        "user": {
            "address": {
                "house": "somewhere out there",
                "street": "near andromeda",
                "state": "Goa",
                "city": "Bambolim",
                "pincode": "121233",
                "country": "India"
            },
            "_id": "64dca5854563a04dffe7cd9b",
            "firstname": "aman",
            "lastname": "gupta",
            "avtar": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(6).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c",
            "email": "amangupta@email.com",
            "phone": 273974328,
            "id": "64dca5854563a04dffe7cd9b"
        },
        "products": [
            {
                "productId": "64c74b6010ceb052b95b037e",
                "name": "Globex M77 All-in-one Computer",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F69333c2f-bb4f-40ed-8846-b332e802caa0?alt=media&token=71fe7679-76c4-4fa8-b5e6-cd7a1f8ecff0",
                "quantity": 5,
                "discount": 0,
                "price": 59100,
                "_id": "65368ea3671f3d87b141fbb8"
            },
            {
                "productId": "64c7512b10ceb052b95b0386",
                "name": "IdeaTek i5 CPU",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F02c8c4e1-d199-44ef-9aae-1f993182945f?alt=media&token=b98b0ea8-9b4e-4599-b954-4a81ee70c8f7",
                "quantity": 1,
                "discount": 0,
                "price": 49999,
                "_id": "65368ea3671f3d87b141fbb9"
            },
            {
                "productId": "64ca5d7a953bcfba730dc09a",
                "name": "McAfee Total Protection Antivirus 2023 ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fb554934d-37f8-4a53-860a-d13d124a5654?alt=media&token=dd0a87d5-46b9-4aa9-b09d-88ec660cd0f0",
                "quantity": 1,
                "discount": 0,
                "price": 1500,
                "_id": "65368ea3671f3d87b141fbba"
            },
            {
                "productId": "64ca25ac8f6af900849dfbb2",
                "name": "Globex 700W smart solo Microwave oven ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Ff1b65308-8318-43b5-a098-9e9c48e9cdbb?alt=media&token=5d9a85ff-dcf1-4578-a750-2ed7e8772b9e",
                "quantity": 1,
                "discount": 0,
                "price": 5000,
                "_id": "65368ea3671f3d87b141fbbb"
            },
            {
                "productId": "64c69d66c8b5667ef02f36c5",
                "name": "Redmi A2 (Sea Green, 2GB RAM, 32GB Storage)",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fc0dfeda0-f36d-4c4c-8fd0-74e94220e570?alt=media&token=fa8691b3-9d53-45a8-aced-2f92c435a379",
                "quantity": 5,
                "discount": 0,
                "price": 6000,
                "_id": "65368ea3671f3d87b141fbbc"
            },
            {
                "productId": "64c757f810ceb052b95b039e",
                "name": "EXO MP3 Player",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F9df80e24-9a2f-4679-b74f-950e07eff5de?alt=media&token=e11a41d4-e680-4648-84af-a01537b34f43",
                "quantity": 1,
                "discount": 0,
                "price": 45899,
                "_id": "65368ea3671f3d87b141fbbd"
            },
            {
                "productId": "64ca5fc0953bcfba730dc0a2",
                "name": "Cerberus GeForce GTX 1050 4GB Gaming Graphics Card ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fe402f412-dc64-4f48-a25d-8f77d41ebe47?alt=media&token=cca08095-ccec-43db-81a9-4e59c0886501",
                "quantity": 1,
                "discount": 0,
                "price": 1500,
                "_id": "65368ea3671f3d87b141fbbe"
            },
            {
                "productId": "64c6a234c8b5667ef02f36cf",
                "name": "Sony WH-CH520, Wireless On-Ear Bluetooth Headphones with Mic",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F8175b06d-714e-46be-8b0f-4e704acf8a31?alt=media&token=6f19ac90-41e2-4e7d-b935-14dbfaf2e4e0",
                "quantity": 1,
                "discount": 0,
                "price": 6000,
                "_id": "65368ea3671f3d87b141fbbf"
            },
            {
                "productId": "64c9e8a38f6af900849dfb93",
                "name": "Sky 65 Drone ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fb3758d1e-43ff-47e1-8cfe-1aab7f8e5c0c?alt=media&token=86bda328-05bb-4d86-9a46-d85bedd23fe7",
                "quantity": 1,
                "discount": 0,
                "price": 13999,
                "_id": "65368ea3671f3d87b141fbc0"
            }
        ],
        "totalAmount": 494337,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-10-23T15:17:55.367Z",
        "__v": 0
    },
    {
        "shippingAddress": {
            "line1": "Guru Gobind Singh Marg",
            "line2": "3",
            "city": "fds",
            "postal_code": "222222",
            "state": "LD",
            "country": "IN"
        },
        "_id": "653695a6e1202306f0e5e685",
        "orderId": "ecb33e67-0c7b-45cc-ac00-b23c194384b9",
        "tax": 2200,
        "shipping": 0,
        "payment_status": "paid",
        "receiptUrl": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmh2a3BTSkRFVk56cVhsKLOq2qkGMgaFjLhIL2w6LBYkK7X-IeJjvNhKi_tEnwcKOHhcT4jRFztJKiy3TUEZlR1GDhmqMIc1cihB",
        "user": {
            "address": {
                "house": "somewhere out there",
                "street": "near andromeda",
                "state": "Goa",
                "city": "Bambolim",
                "pincode": "121233",
                "country": "India"
            },
            "_id": "64dca5854563a04dffe7cd9b",
            "firstname": "akshay",
            "lastname": "sahu",
            "avtar": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(4).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c",
            "email": "akshay775@email.com",
            "phone": 273974328,
            "id": "64dca5854563a04dffe7cd9b"
        },
        "products": [
            {
                "productId": "64ca5d7a953bcfba730dc09a",
                "name": "McAfee Total Protection Antivirus 2023 ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fb554934d-37f8-4a53-860a-d13d124a5654?alt=media&token=dd0a87d5-46b9-4aa9-b09d-88ec660cd0f0",
                "quantity": 1,
                "discount": 0,
                "price": 1500,
                "_id": "653695a6e1202306f0e5e686"
            },
            {
                "productId": "64ca5fc0953bcfba730dc0a2",
                "name": "Cerberus GeForce GTX 1050 4GB Gaming Graphics Card ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fe402f412-dc64-4f48-a25d-8f77d41ebe47?alt=media&token=cca08095-ccec-43db-81a9-4e59c0886501",
                "quantity": 1,
                "discount": 0,
                "price": 1500,
                "_id": "653695a6e1202306f0e5e687"
            },
            {
                "productId": "64ca25ac8f6af900849dfbb2",
                "name": "Globex 700W smart solo Microwave oven ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Ff1b65308-8318-43b5-a098-9e9c48e9cdbb?alt=media&token=5d9a85ff-dcf1-4578-a750-2ed7e8772b9e",
                "quantity": 1,
                "discount": 0,
                "price": 5000,
                "_id": "653695a6e1202306f0e5e688"
            },
            {
                "productId": "64c9e8a38f6af900849dfb93",
                "name": "Sky 65 Drone ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fb3758d1e-43ff-47e1-8cfe-1aab7f8e5c0c?alt=media&token=86bda328-05bb-4d86-9a46-d85bedd23fe7",
                "quantity": 1,
                "discount": 0,
                "price": 13999,
                "_id": "653695a6e1202306f0e5e689"
            }
        ],
        "totalAmount": 24199,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-10-23T15:47:50.671Z",
        "__v": 0
    },
    {
        "shippingAddress": {
            "line1": "32",
            "line2": "32",
            "city": "fds",
            "postal_code": "333234",
            "state": "KL",
            "country": "IN"
        },
        "_id": "65369a04c38e686c6596a8ad",
        "orderId": "5bf0e2fd-28ed-494f-87e0-035d690ccc5e",
        "tax": 300,
        "shipping": 0,
        "payment_status": "paid",
        "receiptUrl": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmh2a3BTSkRFVk56cVhsKI6z2qkGMgZWD1KaVTw6LBYkSMj9mWD1z9AXvl7_rUJzUYneNry76KMsyhyq3boanSDtfaQX8OKJq_MZ",
        "user": {
            "address": {
                "house": "somewhere out there",
                "street": "near andromeda",
                "state": "Goa",
                "city": "Bambolim",
                "pincode": "121233",
                "country": "India"
            },
            "_id": "64dca5854563a04dffe7cd9b",
            "firstname": "balwainder",
            "lastname": "kumar",
            "avtar": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(13).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c",
            "email": "balwinder@email.com",
            "phone": 273974328,
            "id": "64dca5854563a04dffe7cd9b"
        },
        "products": [
            {
                "productId": "64ca5d7a953bcfba730dc09a",
                "name": "McAfee Total Protection Antivirus 2023 ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fb554934d-37f8-4a53-860a-d13d124a5654?alt=media&token=dd0a87d5-46b9-4aa9-b09d-88ec660cd0f0",
                "quantity": 1,
                "discount": 0,
                "price": 1500,
                "_id": "65369a04c38e686c6596a8ae"
            },
            {
                "productId": "64ca5fc0953bcfba730dc0a2",
                "name": "Cerberus GeForce GTX 1050 4GB Gaming Graphics Card ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fe402f412-dc64-4f48-a25d-8f77d41ebe47?alt=media&token=cca08095-ccec-43db-81a9-4e59c0886501",
                "quantity": 1,
                "discount": 0,
                "price": 1500,
                "_id": "65369a04c38e686c6596a8af"
            }
        ],
        "totalAmount": 3300,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-10-23T16:06:28.263Z",
        "__v": 0
    },
    {
        "shippingAddress": {
            "line1": "99999999999",
            "line2": "rew",
            "city": "342",
            "postal_code": "332433",
            "state": "KL",
            "country": "IN"
        },
        "_id": "6544a3759deb6574c07320a1",
        "orderId": "4229603a-93a5-401f-88df-8d5e996b7dcb",
        "tax": 600,
        "shipping": 0,
        "payment_status": "paid",
        "user": {
            "address": {
                "house": "somewhere out there",
                "street": "near andromeda",
                "state": "Goa",
                "city": "Bambolim",
                "pincode": "121233",
                "country": "India"
            },
            "_id": "64dca5854563a04dffe7cd9b",
            "firstname": "ankit",
            "lastname": "rohilla",
            "avtar": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(17).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c",
            "email": "ankitrohilla@email.com",
            "phone": 273974328,
            "id": "64dca5854563a04dffe7cd9b"
        },
        "products": [
            {
                "productId": "64ca5d7a953bcfba730dc09a",
                "name": "McAfee Total Protection Antivirus 2023 ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fb554934d-37f8-4a53-860a-d13d124a5654?alt=media&token=dd0a87d5-46b9-4aa9-b09d-88ec660cd0f0",
                "quantity": 4,
                "discount": 0,
                "price": 1500,
                "_id": "6544a3759deb6574c07320a2"
            }
        ],
        "totalAmount": 6600,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-11-03T07:38:29.440Z",
        "__v": 0
    },
    {
        "shippingAddress": {
            "line1": "99999999999",
            "line2": "rew",
            "city": "fds",
            "postal_code": "443342",
            "state": "LA",
            "country": "IN"
        },
        "_id": "655f7f51d904d2759aad6655",
        "orderId": "025d2ed8-6bb5-4dd5-8a8e-d5469d993249",
        "tax": 5400,
        "shipping": 0,
        "payment_status": "paid",
        "receiptUrl": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmh2a3BTSkRFVk56cVhsKMv9_aoGMgaNEWvSPL86LBYdthWockOjaxOq-5-lI1uDsTnUsVrCLuZk6b1ZJkV9Bq6GuqiI9nG-S5HH",
        "user": {
            "address": {
                "house": "square planet",
                "street": "kepler belt ",
                "state": "Uttar Pradesh",
                "city": "Ambedkar Nagar",
                "pincode": "575757",
                "country": "India"
            },
            "_id": "655cc1774d10d0ed28efde44",
            "firstname": "Deepak",
            "lastname": "Yadav",
            "avtar": "https://lh3.googleusercontent.com/a/ACg8ocKwedfopvGaN9MRt1FQYJ3JH9cmwWS5sio8j_6qwso=s96-c",
            "email": "deepak128@email.com",
            "phone": 2,
            "id": "655cc1774d10d0ed28efde44"
        },
        "products": [
            {
                "productId": "64c698900ef6832aa59e93bb",
                "name": "Apple 2023 MacBook Air Laptop M1 chip",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F7ba318cc-06fb-4940-962b-c1892738b40f?alt=media&token=fa8e4769-758c-4758-ab56-579ba1be8128",
                "quantity": 1,
                "discount": 50,
                "price": 90000,
                "_id": "655f7f51d904d2759aad6656"
            },
            {
                "productId": "64c6a642c8b5667ef02f36dc",
                "name": "Blue-Horn Smart Tank 529 All-in-one Colour Printer",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fbe99951d-6c1d-4aaf-b21e-72dc8f3121dd?alt=media&token=4b4d7e74-be7b-42e0-a5e5-8b77160ebc50",
                "quantity": 1,
                "discount": 0,
                "price": 8999,
                "_id": "655f7f51d904d2759aad6657"
            }
        ],
        "totalAmount": 59399,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-11-23T16:35:29.232Z",
        "__v": 0
    },
    {
        "shippingAddress": {
            "line1": "Bhavbhuti Marg",
            "line2": "32",
            "city": "45",
            "postal_code": "110006",
            "state": null,
            "country": "HU"
        },
        "_id": "6566dac02482412d7730f0b9",
        "orderId": "178c3ced-0b7c-4930-beee-34e129e25443",
        "tax": 4500,
        "shipping": 0,
        "payment_status": "paid",
        "receiptUrl": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmh2a3BTSkRFVk56cVhsKL-1m6sGMgZQw1vpQkI6LBYG3cdpA-s_uYKi7URNSHqM2GKyHXN5EariAf590TIehouQ4pcTVbKXFpwp",
        "user": {
            "address": {
                "house": "somewhere out there",
                "street": "near andromeda",
                "state": "Goa",
                "city": "Bambolim",
                "pincode": "121233",
                "country": "India"
            },
            "_id": "64dca5854563a04dffe7cd9b",
            "firstname": "rekha",
            "lastname": "singh",
            "avtar": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(16).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c",
            "email": "rekhasingh@email.com",
            "phone": 273974328,
            "id": "64dca5854563a04dffe7cd9b"
        },
        "products": [
            {
                "productId": "64c698900ef6832aa59e93bb",
                "name": "Apple 2023 MacBook Air Laptop M1 chip",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F7ba318cc-06fb-4940-962b-c1892738b40f?alt=media&token=fa8e4769-758c-4758-ab56-579ba1be8128",
                "quantity": 1,
                "discount": 50,
                "price": 90000,
                "_id": "6566dac02482412d7730f0ba"
            }
        ],
        "totalAmount": 49500,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-11-29T06:31:28.363Z",
        "__v": 0
    },
    {
        "shippingAddress": {
            "line1": "Bhavbhuti Marg",
            "line2": "32",
            "city": "45",
            "postal_code": "110006",
            "state": null,
            "country": "HU"
        },
        "_id": "6566fae36a834c7ca3d87627",
        "orderId": "fa7cac3e-e821-4ab9-a095-66e7135597e0",
        "tax": 150,
        "shipping": 99,
        "payment_status": "paid",
        "receiptUrl": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmh2a3BTSkRFVk56cVhsKOL1m6sGMgbQ5oD_hr86LBYPuodo8J2zBbfTdrlDVwik0r2oF9esOzxetfllsTzB82HxtelzlD2JMNce",
        "user": {
            "address": {
                "house": "somewhere out there",
                "street": "near andromeda",
                "state": "Goa",
                "city": "Bambolim",
                "pincode": "121233",
                "country": "India"
            },
            "_id": "64dca5854563a04dffe7cd9b",
            "firstname": "aruna",
            "lastname": "aggarwal",
            "avtar": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(18).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c",
            "email": "aggarwal5@email.com",
            "phone": 273974328,
            "id": "64dca5854563a04dffe7cd9b"
        },
        "products": [
            {
                "productId": "64c7500110ceb052b95b0383",
                "name": "mBall Wired USB Gaming Mouse",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fa3f70437-0607-40ca-8757-787c0f6c6e69?alt=media&token=6b00b143-b636-4af0-85f6-4435243eef02",
                "quantity": 1,
                "discount": 0,
                "price": 300,
                "_id": "6566fae36a834c7ca3d87628"
            },
            {
                "productId": "64c75a5310ceb052b95b03ae",
                "name": "KS 64GB Pendrive ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F957789a7-bb41-4aea-ab65-bc061fed4418?alt=media&token=112d5dc4-2893-440d-b406-3e4b2cd2a339",
                "quantity": 1,
                "discount": 0,
                "price": 899,
                "_id": "6566fae36a834c7ca3d87629"
            },
            {
                "productId": "64ca5cc0953bcfba730dc096",
                "name": "Ubuntu Linux Desktop 22.04 Official 64-bit",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Ff1577bb6-a246-4973-9cae-3fc0a4485b14?alt=media&token=108ec33a-9260-415b-958e-50142b079360",
                "quantity": 1,
                "discount": 0,
                "price": 300,
                "_id": "6566fae36a834c7ca3d8762a"
            }
        ],
        "totalAmount": 1748,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-11-29T08:48:35.334Z",
        "__v": 0
    },
    {
        "shippingAddress": {
            "line1": "99999999999",
            "line2": "32",
            "city": "32",
            "postal_code": "353523",
            "state": "JK",
            "country": "IN"
        },
        "_id": "6567550dbde8935df8b7a0d6",
        "orderId": "430b8d5c-91f2-40dd-a713-90357c44cc41",
        "tax": 87269,
        "shipping": 99,
        "payment_status": "paid",
        "receiptUrl": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmh2a3BTSkRFVk56cVhsKIOpnasGMgbOQSI_cg46LBbOUhOurhw1Q8Nxofhi3wfVDB_PQZFY4IUz2f0UsKvh6AsR5DEEP8aVqivq",
        "user": {
            "address": {
                "house": "somewhere out there",
                "street": "near andromeda",
                "state": "Goa",
                "city": "Bambolim",
                "pincode": "121233",
                "country": "India"
            },
            "_id": "64dca5854563a04dffe7cd9b",
            "firstname": "yash",
            "lastname": "chauhan",
            "avtar": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(13).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c",
            "email": "yashchauhan@email.com",
            "phone": 273974328,
            "id": "64dca5854563a04dffe7cd9b"
        },
        "products": [
            {
                "productId": "64c699660ef6832aa59e93c0",
                "name": "ASUS Vivobook Pro 15",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fc8436008-56b0-42a1-aeda-9c7f6f2c0378?alt=media&token=8356f54e-af74-40eb-977b-cd6f67083656",
                "quantity": 12,
                "discount": 0,
                "price": 72599,
                "_id": "6567550dbde8935df8b7a0d7"
            },
            {
                "productId": "64c7500110ceb052b95b0383",
                "name": "mBall Wired USB Gaming Mouse",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Fa3f70437-0607-40ca-8757-787c0f6c6e69?alt=media&token=6b00b143-b636-4af0-85f6-4435243eef02",
                "quantity": 1,
                "discount": 0,
                "price": 300,
                "_id": "6567550dbde8935df8b7a0d8"
            },
            {
                "productId": "64c75a5310ceb052b95b03ae",
                "name": "KS 64GB Pendrive ",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2F957789a7-bb41-4aea-ab65-bc061fed4418?alt=media&token=112d5dc4-2893-440d-b406-3e4b2cd2a339",
                "quantity": 1,
                "discount": 0,
                "price": 899,
                "_id": "6567550dbde8935df8b7a0d9"
            },
            {
                "productId": "64ca5cc0953bcfba730dc096",
                "name": "Ubuntu Linux Desktop 22.04 Official 64-bit",
                "image": "https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/shoppitt%2Ff1577bb6-a246-4973-9cae-3fc0a4485b14?alt=media&token=108ec33a-9260-415b-958e-50142b079360",
                "quantity": 1,
                "discount": 0,
                "price": 300,
                "_id": "6567550dbde8935df8b7a0da"
            }
        ],
        "totalAmount": 960055,
        "status": "Pending",
        "paymentMethod": "Card",
        "createdAt": "2023-11-29T15:13:17.645Z",
        "__v": 0
    }
]

module.exports = dummyOrders