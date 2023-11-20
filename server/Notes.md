NOTE :::the issue that without internet you are not abke to acces db,,,setup the db on local

# Defects
- remove the box shadow from dropdons in navbar in mobile view
- add a nice loader for all the loading process (the new loader, implement that one),  make the same loader for both admin and front
- if any of the resulted productas is clicked on search prod than the search bar should close and overlay shoul be removed
- on order page show loader when fetching the order
- recipt url get expirewd after a period , maybe the recipt can be copied to a canvas or img and store in server
- remove to cart isnt rel time ,,no showng deleted items
- modals height is morr than vh
- need to add toast status on admin side and also at the server response
- check each and every categoryes..for example playstation is not showing up
- try creating utility function,, for like toast,,,instead of writing those 3 lines everywhere//settoaststatus,content and visibility are three action that wil be dispatched from multiple componnets ,,instead create a common function and call it
- have to find a way to update the cart number at navabr whenevrr item added or incremented
- cureently the categoyr page is breaking the Link chaain an dreloading the appp
- when session ecxipred the wishlist page is not showing toast and also hide the loader if the session exppired and sghow to login 
- delete product and disable product all stuff..all basic things that were in skyblog,,just copy
- on hompgae add by category options for products
- add a message that selling fast or something when stock is less than 5
- add dicount field for product whihc will be dfault to 0 and admin can set the discount whenever
- for now there is no option to update queantity from profuct page ,,it willl be only be done from cart page
- we dont need the image upload progress in here,,instead add a loader to shoup product add status
- grey out when products when they are out of stocks
- when new image is added,,refresh the list
- show HOME > Order > order id for order page
- stripe does not accept payemnt more than 999,999 (error)StripeInvalidRequestError: The Checkout Session's total amount due must be no more than ₹999,999.99.
- fix admin filter
- sticky navbar in admin dasboard
- image preview background
- have to add logic for eerror page or we can show like item not found for id routes....where if the url has wrong id,,the error page wont go as the router dosnt know it thats a wrong it ,,it will still redirect to pri=docut page,,there u have to check if the response from the server is null than show that item is not found,,,this goes for prdocts,orders,categoryes ewveruthing whihc has id route
- set isuserloggedin to false whenever session expired is returned bcz it needs to refersh to show s=the signin option back when expired while the app is running
- dont focus on discount now,, let irt as it is,,later add a field in product form where seller will update discount
- one backspaceing in otp inputs,,two digits are getting erased
- if product has more tha one image then its not uploading the other images on slow network,,its an issue
- there should be an option to delete a prooduct but before deleting chekc thta produict is is an anyone's cart or is pending to be deleived, if not only than let it be deleted
- in product form fix the add/edit button at bottom
- on every action like on adding prodcut pr deleeting ,,all repsonse from serever,,,add a notification for that response,,,let user now what has been done and then dont refresh the page,,,call the required api which will update the page
- when any action gets complete then dont refresh the page just reload the stuff and show toast about the action



# TODO
- have to addd the options for select actegoies in add prodduct also with the option to add super category
- also check responsiveness betwwen 768-992
- clear unneccsary stuff



# Wouldn't hurt to have (least priority)
- add the part where user can add items to cart without logging in,,use cookies to store cart items
- there can be a cicrle or whatever button for feedback at the bottom right asking for feedback for users overall experienece
- make the images for product  go slide in slide no just disapper and display
- can add on hover cart show cart items with two option of view cart and checkout oprtion (there is sample layout url also below somewhere)
- can chnage toast design for user side( can make it more elegant)
- think about converting the navbar into a small cicle hovering and on click it expands and become the navbar (in other words OR - on scroll dont keep the nav fixed, instead make a minifide nav which will stay floated at the top)
- make the same loader for both admin and front...use logo,,and for admin just put a hat above the logo's top
*product admin image upload*
- havee to add delete image from firestoreage when product is deleted
- add the feature where selected images to be uploaded can be unselected individually before uploaing and also after seecting other images can also be selected and should be appneded to the exisiting list
- when images are selected through inputs then for multiple images there should be an option to remove imgages
*product admin image upload*
- initially only 3 reviews will be added in product schema,the rest will go to reviews table with the product id as key, so the tree reviews will be shown initailly and on cliccking view more the rest of reviews will be loaded from review table
- admin menubar will be like hanging from ;left or maybe circular at any corner,,,will have desktop where it will show all products categories,,,orders completed and orders in progress





- we have to populat the ref field on signin and signup and also at getuserinfo//--not sure --->>and just call cart products and orders on their respective page,,cart ietms number badge number on navbar can be taken care by the cart length whihc is product id only>>>>the proble is aboout calling ten api to get cart order and wihslist on each page or keep them in app in advance from other actions,,which can be unneccesary though
------FINAL DECISON-- call the api on dedicated page ..on signin dont populate anithing...neither onget userdetails>>>>with this approach we wont need the getuseindo to send user indo also,,,ww will have the useefect on age in user component to gte user details,,,gthere might be somepage where we will need more than that,,for that we can eidt the getuseinfo to reurn bassic info like email and name after just checking the cookie presence>>>>>STILL NOT SURE ABOUT THIS,,,every render will call this dedicated api and it kinds of eleiminates redux and makes it like server side rendering


# URLS
- https://stripe.com/docs/api/checkout/sessions/create
- fullfill orders https://stripe.com/docs/payments/checkout/fulfill-orders
- if this fulfilled webhpook is used than webhook needed to b regeristerd also
- in stripe https://dashboard.stripe.com/test/payouts at this url there will be a exapmle how to cretae filter for admin in nav

- cart example https://www.optimonk.com/10-impressive-ecommerce-shopping-cart-design-examples-online/

..FOR PAYEMNT CONFIRm
https://www.freepik.com/free-vector/successful-purchase-concept-illustration_7069728.htm#query=order%20page&position=9&from_view=keyword&track=ais


- **_ORDER PAGE_**
https://dribbble.com/tags/order_page#
dashboard - https://dribbble.com/shots/18572195-admin-dashboard-order-page

- **_PRODUCT PAGE_** https://codepen.io/filipdanisko/pen/VadXXq

http://preview.themeforest.net/item/ella-multipurpose-shopify-theme-os-20/full_screen_preview/9691007?_ga=2.156118136.2104234991.1689665488-2058099207.1682318429&_gac=1.242927030.1689665488.EAIaIQobChMI9Jfytt6XgAMVt5lmAh3z2QlPEAAYASAAEgLCCPD_BwE

https://new-ella-demo.myshopify.com/pages/landing-2

...citi state country db
https://dr5hn.github.io/countries-states-cities-database/


- fort products dashboard refer to this
  [https://bs-5-jekyll-git-airframe-styleguide-tomaszowczarczyk.vercel.app/]products
  -color and box shadow [https://codepen.io/animationbro/full/poLvzmE]
- menu hamburger icon [https://codepen.io/Vishal4225/pen/jOezoZj]

- https://www.freepik.com/free-photos-vectors/sale-png




# CATEGORY [architecture]
- about subcategory,,in each categoyr documnet there shoudl be field 'subcategory',,and this subcategory-- this will help in to show the heirrachy of categories,,
- but the subcategoires will have their own document in categories collection and their sub will be empty
- these category and subcategory can have similar products
- in product document their will be a category
- the main thing to conclude every subcategory problem is that we will never show products on parent category(the topmost,,only when it is searched,,when searched will look for that word) ..we will only show the direct category ...




### forever notes
- you cannot just send an object in post reuqest as it would show [object] in backend as formdata does not accept object as a value, so always stringfy your object before posting 

- when you have to put a stick position to a navabar or any element remember that the parent shoudl hav emore height than the element to be sticky and on sticky element give top properyty ,,only sticky wont do anything you need top,,
- https://codepen.io/polypane/full/LYdvPze
- https://polypane.app/css-3d-transform-examples/
  https://3dtransforms.desandro.com/carousel
  https://codepen.io/blazit/pen/BaGmmaP

- changing div can be implemented with this https://codepen.io/TheMOZZARELLA/pen/dyZZKqE
- // box-shadow: 1px 7px 14px -5px rgba(0,0,0,0.2);