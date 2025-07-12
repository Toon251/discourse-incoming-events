import Component from "@glimmer/component";
import { computed, action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from "@glimmer/tracking";

export default class IncomingEvent extends Component {
    @tracked incomingEvents = [];
    @tracked title = "";
    //@tracked outlet = "";
    @tracked shown = false;
    @tracked login = false;
    @tracked docUrl = "";

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

    async checkLogin() {
        try {
            const response = await fetch(`/session/current.json`);
            
            // Check specifically for 404 error
            if (response.status === 404) {
                //console.error('Endpoint not found (404)');
                this.login = false;
                return false;
            }
            
            // Check for other HTTP errors
            if (!response.ok) {
                //console.error(`HTTP error! status: ${response.status}`);
                this.login = false;
                return false;
            }
            
            const data = await response.json();
            console.log('Session data:', data);
            
            if (data.current_user) {
                return true;
            } else {
                return false;
            }
            
        } catch (error) {
            console.error('Login check error:', error);
            return false;
        }
    
    }
  
    constructor() {
        super(...arguments);
        this.loadEvents(); 
        
    }


    async loadEvents() {
        try {
        
          this.title = settings.title;
          /*console.log("mobile : ", window.matchMedia("(max-width: 767px)").matches);
          if(window.matchMedia("(max-width: 767px)").matches) {
            this.outlet = settings.plugin_outlet_mobile;
          }else {
            this.outlet =  settings.plugin_outlet;
          }
          console.log(this.outlet)*/
          
        
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
          console.log(respData.data);

          this.checkLogin();
          

          //console.log('Events:', this.incomingEvents);
        } catch (error) {
          console.error('Error during fetch:', error);
        } finally {
          this.shown = true;
        }
      }
}