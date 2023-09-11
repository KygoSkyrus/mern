# WORKFLOW:::


inidividual 
- caling api on their own and populate cart
- 
- have to update the user on signin/- no need only user data
- on reload - only check
- on add prod - no need to populate cart items
- on remove prod 



existing
- have to update the user on signin/
- on reload
- on add prod
- on remove prod 

- same thing willl be doen for wishlist orders 


-- remove to cart isnt rel time ,,no showng deleted items
-- wishlist etc
-- clear unneccsary stuff
-- find a layout for cart and order page
-- cateory display??
-- modals height is morr than vh
-- search page  
-- add delete account option //later remove it on production
-- need to add toast status on admin side and also at the server response


-- we have to populat the ref field on signin and signup and also at getuserinfo//--not sure --->>and just call cart products and orders on their respective page,,cart ietms number badge number on navbar can be taken care by the cart length whihc is product id only>>>>the proble is aboout calling ten api to get cart order and sihslist on each page or keep them in app in advance from other actions,,which can be unneccesary though
------FINAL DECISON-- call the api on dedicated page ..on signin dont populate anithing...neither onget userdetails>>>>with this approach we wont need the getuseindo to send user indo also,,,ww will have the useefect on age in user component to gte user details,,,gthere might be somepage where we will need more than that,,for that we can eidt the getuseinfo to reurn bassic info like email and name after just checking the cookie presence>>>>>STILL NOT SURE ABOUT THIS,,,every render will call this dedicated api and it linds of eleiminates redux and makes it like server side rendering

- there should pe a page to show the transaction and every details
- the amount of gross sale
- https://stripe.com/docs/api/checkout/sessions/create
- fullfill orders https://stripe.com/docs/payments/checkout/fulfill-orders
- if this fulfilled webhpook is used than webhook needed to b regeristerd also
- in stripe https://dashboard.stripe.com/test/payouts at this url there will be a exapmle how to cretae filter for admin in nav

- cart example https://www.optimonk.com/10-impressive-ecommerce-shopping-cart-design-examples-online/

-- check each and every categoryes..for example playstation is not showing up
-- try creating utility function,, for like toast,,,instead of writing those 3 lines everywhere//settoaststatus,content and visibility are three action that wil be dispatched from multiple componnets ,,instead create a common function and call it

//have to find a way to update the cart number at navabr whenevrr item added or incremented

-- make the images for product  go slide in slide no just disapper and display

-- cureently the categoyr page is breaking the Link chaain an dreloading the appp

done--
-- show signin only if not logged in
-- fix the toast position


## bugs


- hompgae stuff

  - add by category options
  - put in layout all the individual component
  - category in navbar

- add user stuff and then user db ,,the wishlist cart order will go there

  - add toast when addeed to cart or whishlist ;;finihs th homepage layout howeever it looks,,need to get done with that and then check add product payement cart orders etc and also the user account form and firebase login

  -the check add to cart of procut
- can add on hover cart show cart items with two option of view cart and checkout oprtion
  - also adding to wishlight

- add a message that selling fast or something when stock is less than 5

  - once all this done than we will put things in my orders section,thta if delivered, or pending

### todo

- addd category in header
- fill the homepage iwth banners and products
- us the categories in db
- check add to cart and payment, redirectio to succes and failure page

- toast should have ignos for danger warning and info...can chnage toast design for user side

1. first complete the add product feature,,
2. delete product and diable product all stuff..all basic things that were in skyblog,,just copy
3. get rid of unecessary stuff
4. once all its done,,upload all the product with detials to the homepage can be designed

- for now there is no option to update queantity from profuct page ,,it willl be only be done from cart page
- add the part where user can add items to cart without logging in,,use cookies to store cart items
- categories should be visible on hover
- finish homepage,,
- we dont need the image upload progress in here,,instead add a loader to shoup product add status
- add user account compo
- add dark light option in admin
- add dicount field for product whihc will be dfault to 0 and admin can set the discount whenever
- **PRODUCT**
- add wishlist option for produicts
- grey out when products when they are out of stocks
- when new image is added,,refresh the list
- when searching for products in the db donts send "s" ,,like only send speaker in query not speakers

**_product page_** thick about converting the navbar into a small cicle hovering and on click it expands and become the navbar
s

- for signin inputs there is a layoout img in assets folder

- **_PRODUCT PAGE_** https://codepen.io/filipdanisko/pen/VadXXq

http://preview.themeforest.net/item/ella-multipurpose-shopify-theme-os-20/full_screen_preview/9691007?_ga=2.156118136.2104234991.1689665488-2058099207.1682318429&_gac=1.242927030.1689665488.EAIaIQobChMI9Jfytt6XgAMVt5lmAh3z2QlPEAAYASAAEgLCCPD_BwE

https://new-ella-demo.myshopify.com/pages/landing-2

...citi state country db
https://dr5hn.github.io/countries-states-cities-database/

// box-shadow: 1px 7px 14px -5px rgba(0,0,0,0.2);

# CATEGORY

- we can have categories like in skyblog,,but whats the point of repeating the same stuff,,
  the new approact is to use ref,,what ref does is that for a specific document it refers to the documents from other collections,
  if we do this in category documnet for like laptop category document we will have to list of all the laptop products from the product collection,,so wehn you fetch caetgiry laptop from db then youll have everything that you need at once- to do this one you will quesy the category collection and get the required caegory,, and if you dont do that then you will, query the prodcuct collectction for the required castegory and filter product from the category...they both are same but the first approach we neevr used..

-- about subcategory,,
in each categoyr documnet there shoudl be field 'subcategory',,and this subcategory-- this will help in to show the heirrachy of categories,,
--but the subcategoires will have their own document in categories collection and their sub will be empty

- these category and subcategory can have similar products

- in product document their will be a category
- the main thing to conclude every subcategory problem is that we will never show products on parent category(the topmost,,only when it is searched,,when searched will look for that word) ..we will only show the direct category ...

### w/o IP

- fix admin filter
- sticky navbar in admin dasboard
- image preview background

### DEFECTS

- dont focus on discount now,, let irt as it is,,later add a field in product form where seller will update discount
- one backspaceing in otp inputs,,two digits are getting erased
- if product has more tha one image sthen its not uploading the other images on slow network,,its an issue
- there should be an option to delete a prooduct but before deleting chekc thta produict is is an anyone's cart or is pending to be deleived, if not only than let it be deleted
- in product form fix the add/edit button at bottom

### Thoughts

- make the same loader for both admin and front...use logo,,and for admin just put a hat above the logo's top
- initially only 3 reviews will be added in product schema,the rest will go to reviews table with the product id as key, so the tree reviews will be shown initailly and on cliccking view more the rest of reviews will be loaded from review table
- admin menubar will be like hanging from ;left or maybe circular at any corner,,,will have desktop where it will show all products categories,,,orders completed and orders in progress
- fort products dashboard refer to this
  [https://bs-5-jekyll-git-airframe-styleguide-tomaszowczarczyk.vercel.app/]products
  -color and box shadow [https://codepen.io/animationbro/full/poLvzmE]
- menu hamburger icon [https://codepen.io/Vishal4225/pen/jOezoZj]
- on every action like on adding prodcut pr deleeting ,,all repsonse from serever,,,add a notification for that response,,,let user now what has been done and then dont refresh the page,,,call the required api which will update the page

- when any action gets complete then dont refresh the page just reload the stuff and show toast about the action

NOTE;:::the issue that withou internet you are not abke to acces db,,,setup the db on local

### would be better to have

- on scroll dont keep the nav fixed, instead make a minifide nav which will stay floated at the top
- havee to add delete image from firestoreage when product is deleted
- add the feature where selected images to be uploaded can be unselected individually before uploaing and also after seecting other images can also be selected and should be appneded to the exisiting list
- when images are selected through inputs then for multiple images there should be an option to remove imgages

https://www.freepik.com/free-photos-vectors/sale-png

### forever notes

- when you have to put a stick position to a navabar or any element remember that the parent shoudl hav emore height than the element to be sticky and on sticky element give top properyty ,,only sticky wont do anything you need top,,
- https://codepen.io/polypane/full/LYdvPze
- https://polypane.app/css-3d-transform-examples/
  https://3dtransforms.desandro.com/carousel
  https://codepen.io/blazit/pen/BaGmmaP

- chamnging div can be implemented with this https://codepen.io/TheMOZZARELLA/pen/dyZZKqE
