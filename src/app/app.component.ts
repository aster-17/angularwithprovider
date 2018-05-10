import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  toggleNav() {

        /* jQuery Animation to open Nav */
        console.log($(".navCommon").css('left'));
        if ($(".navCommon").css('left') == '0px') {
            $(".navCommon").animate({
                left: "-60%"
            });
        } else {
            $(".navCommon").animate({
                left: "0px"
            });
        }
        /* jQuery Animation to open Nav */

    }
}
