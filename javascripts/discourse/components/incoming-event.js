import Component from "@glimmer/component";
import { computed, action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from "@glimmer/tracking";

export default class IncomingEvent extends Component {
    @tracked incomingEvents = [];
    @tracked title = "";
    @tracked outlet = "";
    @tracked shown = false;

    @computed
    get isMobile() {
      //return /Mobi|Android/i.test(navigator.userAgent);
      return window.matchMedia("(max-width: 767px)").matches;
    }

    

    @computed
    get getOutlet() {
      console.log("Mobile " , window.matchMedia("(max-width: 767px)").matches)
      console.log(window.matchMedia("(max-width: 767px)").matches ? settings.plugin_outlet_mobile : settings.plugin_outlet)
      return window.matchMedia("(max-width: 767px)").matches ? settings.plugin_outlet_mobile : settings.plugin_outlet;
    }
  
    constructor() {
        super(...arguments);
        this.loadEvents(); 
        
    }


    async loadEvents() {
        try {
        
          this.title = settings.title;
          console.log("mobile : ", window.matchMedia("(max-width: 767px)").matches);
          if(window.matchMedia("(max-width: 767px)").matches) {
            this.outlet = settings.plugin_outlet_mobile;
          }else {
            this.outlet =  settings.plugin_outlet;
          }
          console.log(this.outlet)
          this.shown = true
        
          // Get
          const resp = await fetch(settings.url, 
            { 
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              } }
          );
          const respData = await resp.json();
          if(respData.success){
            this.incomingEvents = respData.data;
          }
          

          //console.log('Events:', this.incomingEvents);
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
}