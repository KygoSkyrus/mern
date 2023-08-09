# WORKFLOW:::

- hompgae stuff

  - add by category options
  - put in layout all the individual component
  - category in navbar


- add user stuff and then user db ,,the wishlist cart order will go there



  - add toast when addeed to cart or whishlist ;;finihs th homepage layout howeever it looks,,need to get done with that and then check add product payement cart orders etc and also the user account form and firebase login

  -the check add to cart of procut

  - also adding to wishlight





  - once all this done than we will put things in my orders section,thta if delivered, or pending

### todo

- addd category in header
- fill the homepage iwth banners and products
- us the categories in db
- check add to cart and payment, redirectio to succes and failure page

1. first complete the add product feature,,
2. delete product and diable product all stuff..all basic things that were in skyblog,,just copy
3. get rid of unecessary stuff
4. once all its done,,upload all the product with detials to the homepage can be designed

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
  `https://codepen.io/tag/product-card`
- extra card [https://codepen.io/toufiq-gilani/pen/xxaVBgz]

- for signin inputs there is a layoout img in assets folder

- https://codepen.io/syrizaldev/pen/MWqJzXY

- **_PRODUCT PAGE_** https://codepen.io/filipdanisko/pen/VadXXq

http://preview.themeforest.net/item/ella-multipurpose-shopify-theme-os-20/full_screen_preview/9691007?_ga=2.156118136.2104234991.1689665488-2058099207.1682318429&_gac=1.242927030.1689665488.EAIaIQobChMI9Jfytt6XgAMVt5lmAh3z2QlPEAAYASAAEgLCCPD_BwE

https://new-ella-demo.myshopify.com/pages/landing-2

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


