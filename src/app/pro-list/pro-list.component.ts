import {
    Component,
    OnInit
} from '@angular/core';
import {
    Title
} from '@angular/platform-browser';
import * as $ from 'jquery';
import {
    ProListService
} from './pro.service';

@Component({
    selector: 'app-pro-list',
    templateUrl: './pro-list.component.html',
    styleUrls: ['./pro-list.component.css'],
    providers: [ProListService]
})
export class ProListComponent implements OnInit {

    userToken: any = "usersk_17";
    currentCart: any;
    updatedCart: any[] = new Array();
    productList: any;
    isNewEntry: boolean = true;
    cartCounter: number;
    currentFilter: any;
    filteredList: any[] = new Array();
    constructor(private titleService: Title, private proservice: ProListService) {

        this.titleService.setTitle('Product list | Healthyfie');
        /* Fetch products on init */
        this.proservice.fetch_products().subscribe(res => {
            this.productList = res;
            this.filter_method(2); // filtering vegetables
        });
        /* Fetch products on init */

        /* Taking cart value in angular */
        this.currentCart = JSON.parse(localStorage.getItem("currentCart"));
        if (this.currentCart == null)
            this.cartCounter = 0; // updating cart counter at the time of executation 
        else
            this.cartCounter = this.currentCart.length; // updating cart counter at the time of executation 
    }

    ngOnInit() {

        //ngOnInit is being used for jQuery animation
        $(window).scroll(function() {
            if ($(this).scrollTop() > $('.headerCommon').height()) {
                $('.productFilter').addClass('fixedYellow');
            } else {
                $('.productFilter').removeClass('fixedYellow');
            }
        });


    }


    filter_method(productType) {

        // Filtering the product list at the time of first response and user click
        this.currentFilter = productType;
        this.filteredList = [];
        for (let i = 0; i < this.productList.length; i++) {
            if (this.productList[i].product_type == productType) {
                this.filteredList.push(this.productList[i]);
            }
        }
        // Filtering the product list at the time of first response and user click  
    }

    add_to_cart(pro_id, action) {

        /* Taking cart value in angular */
        this.currentCart = JSON.parse(localStorage.getItem("currentCart"));
        if (this.currentCart == null) {

            // Cart is empty, adding first record in the local storage 
            localStorage.setItem("currentCart", JSON.stringify([{
                id: pro_id,
                token: this.userToken,
                item: 1
            }]));

            // Syncing the cart data in angular after the update
            this.currentCart = JSON.parse(localStorage.getItem("currentCart"));
        } else {
            //console.log(this.currentCart);

            this.updatedCart = []; // New array to filter data from local storage as per current token.
            this.isNewEntry = true; /* This variable determines the presence of product in cart, if it is true then we add new entry in the local storage, otherwise just add/subtract the product quantity on "item key" */


            for (let i = 0; i < this.currentCart.length; i++) {

                // checking cart data for valid/current token 
                if (this.currentCart[i].token == this.userToken) {

                    //console.log('token is validated');

                    // Determines the presence of product in cart
                    if (this.currentCart[i].id == pro_id) {
                        //console.log(this.currentCart[i]);

                        if (action == 'add') {
                            this.currentCart[i].item += 1; // Update quantity as per the action 
                        } else {
                            this.currentCart[i].item -= 1; // Update quantity as per the action 

                        }

                        // After updating if the quantity become 0 then that product will be removed from the cart
                        if (this.currentCart[i].item != 0) {
                            this.updatedCart.push(this.currentCart[i]); // pushing validated records in the new array
                            //console.log('item updated in cart with new item value');
                        }

                        this.isNewEntry = false; // avoiding new entry

                    } else {
                        //console.log('in newentry loop');
                        this.updatedCart.push(this.currentCart[i]); // pushing valid records in the new array
                    }
                }
            }

            //console.log(this.isNewEntry);
            if (this.isNewEntry == true) {
                this.updatedCart.push({
                    id: pro_id,
                    token: this.userToken,
                    item: 1
                }); /* Adding new element in the valid records */
                console.log('adding new entry');
            }
            //console.log(this.updatedCart);
            // Storing the array in the local storage
            localStorage.setItem("currentCart", JSON.stringify(this.updatedCart));

            // Making valid records sync with Angular cart
            this.currentCart = this.updatedCart;
        }

        if (this.currentCart == null)
            this.cartCounter = 0; // updating cart counter at the time of click 
        else
            this.cartCounter = this.currentCart.length; // updating cart counter at the time of click 

    }

}