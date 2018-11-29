import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Subject, Observable, Subscriber } from "rxjs";
import { Feedback } from '../models/feedback.model';
import { Http } from "@angular/http";

@Injectable({providedIn: 'root'})
export class FeedbackService {
    renderComponent: String = "";
    feedbackReceived: Feedback[];
    data: Object;
    constructor(private http:HttpClient){ }
    
    //rate feedback received
    //    rateFeedback (feedbackmessage: string, feedbacksubject: string, feedbackrating: Number, 
    //                 username: string, anonymous: boolean){
    //        const feedback:Object = {feedbackMessage: feedbackmessage, feedbackSubject: feedbacksubject,
    //                                  feedbackRating: feedbackrating, username: username, anonymous: anonymous }
    
    //         var p = new Feedback(feedback);
    //         this.http.post("http://localhost:5000/feedback/rate", p)
    //         .subscribe(response => {
    //             console.log(response)
    
    //         });
    //    }
    
    rateFeedback (feedbackrating: Number, submissionid: string){
        const feedback:Object = {
            feedbackRating: feedbackrating,
            submissionID: submissionid
        }
        
        return this.http.post("http://localhost:5000/feedback/rate-feedback", feedback)
    }
   
   giveFeedback(feedbackbad: string, feedbackwork: string, feedbackgood: string,
    username: string, submissionName:string, anonymous:boolean, submissionID: string){
        const feedbackO:Object = {feedbackBad: feedbackbad, feedbackWork: feedbackwork, feedbackGood: feedbackgood, username: username, submissionName: submissionName, anonymous: anonymous, submissionID: submissionID }

            var feedback = new Feedback(feedbackO);
            return this.http.post("http://localhost:5000/feedback/critique", feedback)
   }

   getFeedbacks(){
       return this.http.get("http://localhost:5000/feedback/all-user").toPromise();
   }
}