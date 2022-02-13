import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Angular-Observables';


    source = of(1,2,3);
    

    observer = {
        next: (x:number) => { console.log(x); },
        error: (err:any) => { console.log(err); },
        complete: () => { console.log('Complete!'); }
    }



    observableTimer = new Observable<number>((o) => {
        let sequence:number[] = [1,2,3,4,5];
        let timeout:NodeJS.Timeout;


        function getValue(i:number){
            timeout = setTimeout(() => {

                o.next(sequence[i]);

                if(i === sequence.length -1){
                    o.complete();
                }

                else{
                    getValue(++i);
                }

            }, 1000);
        }

        getValue(0);

        return{
            unsubscribe(){
                clearTimeout(timeout);
            }
        }

    });

    observerTimer = {
        next: (n:number) => {
            console.log(n);
        },

        error: (error:any) => {
            console.log('Error ' + error);
        },

        complete: () => {
            console.log('Complete!');
        }
    }






    ngOnInit(){
        this.source.subscribe(this.observer);

        this.observableTimer.subscribe(this.observerTimer);
    }
}
