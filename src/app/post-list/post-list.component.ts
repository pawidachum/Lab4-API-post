import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any[];
  form: FormGroup;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) { 
    this.form = this.fb.group({
      userId:'',
      title:'',
      body:''
    });
    // this.form = this.fb.group({
    //   name: '',
    //   email: ''
    // })
  }

  ngOnInit(): void {
    this.loadPost();
    this.httpClient 
        .get('http://codecamp3-simple-api-herokuapp.com/api/posts')
        .subscribe(result => {
          this.posts = result as any[];
        });
  }
   loadPost() {
     this.posts = [];
     this.httpClient
        .get('https://jsonplaceholder.typicode.com/posts')
        .subscribe(result => {
          this.posts = result as any[];
        });
      }
      addPost() {
        const newPost = this.form.value;
        this.httpClient  
        .post('https://jsonplaceholder.typicode.com/posts', newPost)
        .subscribe(result => {
          this.form.reset();
          alert('Add Post Success !');
          this.loadPost();
        });
   }

}
