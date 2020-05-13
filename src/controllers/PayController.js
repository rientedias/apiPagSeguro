/**
 * PAYMENT CONTROLLER
 */

const PGS = require('../config');
const xml2js = require('xml2js');
module.exports = {


    async store(req, res) {

        /**
         * Informações do Cliente
         * cliente
         * cartão
         * endereço
         */
        const client = {

            name: req.body.name,
            email: req.body.email,
            areaCode: req.body.area,
            cell: req.body.cell

        }
        const card = {

            card: req.body.card,
            cvv: req.body.cvv,
            date: req.body.date
        }

        const Address = {

            street: req.body.street,
            number: req.body.number,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country

        }

        //Cliente   
        PGS.sender({
            name: client.name,
            email: client.email,
            phone: {
                areaCode: client.areaCode,
                number: client.cell
            }
        });

        //Item ou Items da Compra.
        PGS.addItem({
            id: '10',
            description: 'descrição do item',
            amount: '20.00',
            quantity: '1'
        });

        //Tipo de frete
        // PGS.shipping({
        //     type: 3
        // });
        
        PGS.shipping({
            type: 1,
            name: client.name,
            email: client.email,
            card: card.card,
            cvv: card.cvv,
            date: card.date,
            address: {
                street: Address.street,
                number: Address.number,
                city: Address.city,
                state: Address.state,
                country: Address.country
            }
        })

        //Checkout
        PGS.checkout((data, response) => {

            if (data) {
                return res.json({ data, cli: client.name });
            }
            xml2js.parseString(response, function (err, result) {

                const json = JSON.stringify(result.errors.error[0]);

                const obj = JSON.parse(json);

                return res.status(400).json({ code: obj.code, message: obj.message });

            });


        });


    }



}