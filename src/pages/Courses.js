import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { username } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/course_students/by_student', {
        params: {
          student_username: username,
        },
      });
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div className="course-container">
      <h1>Courses</h1>
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid key={course.id} item xs={12} sm={6} md={4}>
            <Card className="course-card">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {course.fields.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Duration: {course.fields.duration} weeks
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Courses;
