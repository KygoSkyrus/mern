import tshirt from '../../assets/images/bluetshirt.jpg';
import watch from '../../assets/images/watch.jpg'
import scarf from '../../assets/images/scarf.jpg'
import backpack from '../../assets/images/backpack.jpg';
import binoculars from '../../assets/images/binoculars.jpg'
import blackSneakers from '../../assets/images/blackSneakers.jpg'
import bracelet from '../../assets/images/bracelet.jpg';
import camera from '../../assets/images/camera.jpg'
import fitnesstracker from '../../assets/images/fitnesstracker.jpg'
import headphones from '../../assets/images/headphones.jpg';
import jeanjacket from '../../assets/images/jeanjacket.jpg'
import perfume from '../../assets/images/perfume.jpg'
import pinkpurse from '../../assets/images/pinkpurse.jpg';
import yogamat from '../../assets/images/yogamat.jpg'
import redshoes from '../../assets/images/redshoes.jpg'


const products =[
        { id: 1, name: 'T-shirt', src: tshirt, price: 350 , category: "tshirt" , stock : "10" ,description: "Pure cotton blue t-shirt for men" },
        { id: 2, name: 'Watch', src: watch, price: 7000, category: "watch" , stock : "10" ,description: "Brown leather watch for men and women" },
        { id: 3, name: 'Scarf', src: scarf, price: 299, category: "accessories" , stock : "10" ,description: "Check scarf " },
        { id: 4, name: 'Backpack', src: backpack, price: 899, category: "luggage" , stock : "10" ,description: "Laptop bag with multiple comartments" },
        { id: 5, name: 'Perfume', src: perfume, price: 1280, category: "fashion" , stock : "10" ,description: "Long lasting perfume for women" },
        { id: 6, name: 'Denim jacket', src: jeanjacket, price: 1149, category: "sportswear" , stock : "10" ,description: "Sky-blue colour Jean jacket" },
        { id: 7, name: 'Fitness tracker', src: fitnesstracker, price: 599, category: "health" , stock : "10" ,description: "Multifunctional digital fitness tracker band" },
        { id: 8, name: 'Sneakers', src: blackSneakers, price: 499, category: "shoes" , stock : "10" ,description: "Lightweight black sneakers" },
        { id: 9, name: 'Binoculars', src: binoculars, price: 1800, category: "toys" , stock : "10" ,description: "50x zoom binoculars " },
        { id: 10, name: 'Camera', src: camera, price: 34999, category: "utility" , stock : "10" ,description: "Bestselling camera of the season" },
        { id: 11, name: 'Bracelet', src: bracelet, price: 199, category: "fashion" , stock : "10" ,description: "Anchor bracelet for men" },
        { id: 12, name: 'Red shoes', src: redshoes, price: 1399, category: "shoes" , stock : "10" ,description: "Glowing shoes" },
        { id: 13, name: 'Purse', src: pinkpurse, price: 1649, category: "accessories" , stock : "10" ,description: "Pink Purse for women" },
        { id: 14, name: 'Headphones', src: headphones, price: 1800, category: "electronics" , stock : "10" ,description: "Black colour headphones" },
        { id: 15, name: 'Yoga mat', src: yogamat, price: 350, category: "health" , stock : "10" ,description: "3 meter long yoga mat" }
    ]


export default products