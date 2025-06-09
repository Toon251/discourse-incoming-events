import Component from "@glimmer/component";
import { computed, action } from '@ember/object';
import Service from '@ember/service';

export default class IncomingEvent extends Component {
    @tracked incomingEvents = [];

    @computed
    get isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }
  
    constructor() {
        super(...arguments);
        this.loadEvents(); // โหลด badges เมื่อ component ถูกเรียก
        
    }


    async loadEvents() {
        try {

        
          // Get
          const resp = await fetch(settings.url, 
            { 
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              } }
          );
          incomingEvents = await resp.json();

          console.log('Third fetch result:', data3);
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
}