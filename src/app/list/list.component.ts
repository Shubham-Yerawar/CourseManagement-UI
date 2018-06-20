import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private querySubscription: Subscription;
  courses: any[];

  CoursesQuery = gql`
  query allCourses {
    courses {
      id
      title
      author
      description
      topic
      url
    }
  }`;


  UpdateCourse = gql`
  mutation updateCourseTopic($id:Int!, $topic: String!) {
    updateCourseTopic(id:$id , topic: $topic) {
      id
      topic
    }
  }`;

  deleteCourse = gql`
  mutation deleteCourse($id:Int!){
    deleteCourse(id: $id){
      id
    }
  }
  `;

  addCourse = gql`
  mutation addCourse($CourseToAdd:CourseToAdd!){
    addCourse(newCourse: $CourseToAdd){
      id
      title
      topic
      author
    }
  }
  `;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: this.CoursesQuery
    }).valueChanges.subscribe((x)=> {
      this.courses = JSON.parse(JSON.stringify(x.data.courses));
    })
  }

   i=0;
  update() {
    this.apollo.mutate({
      mutation: this.UpdateCourse,
      variables: {
        id: 1,
        topic: "Newly Added Topic "+(this.i++)
      }
    }).subscribe(({ data }) => {
      // console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }


  add() {
    let newCourse = {
      "title": "My newly added test course",
      "author": "Andrew Mead, Rob Percival",
      "description": "Learn Node.js by building ",
      "topic": "Hancock.js",
      "url": "https://codingthesmartway.com/courses/nodejs/"
    };

    this.apollo.mutate({
      mutation: this.addCourse,
      variables: {
        CourseToAdd: newCourse
      }
    }).subscribe(({ data }) => {
      this.courses.push(data.addCourse);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  delete() {
    this.apollo.mutate({
      mutation: this.deleteCourse,
      variables: {
        id: 2
      }
    }).subscribe(({ data }) => {
      const id = data.id;
      this.courses = this.courses.filter(course => course.id != id);  // only take what is not deleted
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

}
