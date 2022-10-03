# TutorHub

An application based on linking qualified tutors with students who need help and are tired of having to branch out on their own to find quality assistance.

<br/><br/>

<ul>
  <li><h1>TutorHub Team</h1></li>
  <li>Brandon – Head of Back-end development, system architect </li>
  <li>Tyler – Head of Front-end development, project manager</li>
  <li>Simon – Full stack developer</li>
  <li>Brandt – Front-end development, graphic artist</li>
  <li>Troy – Back-end development, scrum master</li>
  <li>Logan – Back-end development, document management</li>

</ul>

<br/><br/>

<ul>
System Requirements
  <li>Smartphone running IOS 16, Android Marshmallow 6.0 or later</li>
  <li>Windows 7, Windows 8, Windows 8.1, Windows 10 or later</li>
  <li>macOS High Sierra 10.13 or later</li>
  <li>64-bit Ubuntu 18.04+, Debian 10+, openSUSE 15.2+, or Fedora Linux 32+</li>
</ul>

<br/><br/>

<h2>Introduction</h2>
<p>
LSU courses, especially the courses required for a student's major, can be challenging to understand, comprehend, and succeed in. Even though professors are there to help out their students, they usually do not understand the students perspective of learning and their thought process. To get hands on help with their schoolwork students will usually seek out tutors and people who have already taken the subject who can use their personal experiences of the course to help the student succeed in the course. The problem with getting a tutor is first navigating through a site that helps students and tutors reach out to one another. The second problem is the finding the availability and preferences of both student and tutor.
Tutorhub can be the first solution for tutors and students to easily access a site and quickly find help from tutors only at LSU. Tutorhub can be used on Iphones or computers and will have many options of tutors located in different categories of our system. Students would just have to login, browse through the system for the specific tutor and schedule a time to meet up via online or in person. But not only will Tutorhub just be for locating tutors but also a site that provides handwritten notes from the tutors that took the class so that students can be given former-student notes.</p>

<br/><br/>

<h2>API Routes</h2>

<h3>POST /api/users/register</h3>

<ul>
Requires
  <li>String fullName</li>
  <li>String email</li>
  <li>String password</li>
  <li>Int profileType</li>
  Registers new user
</ul>

<h3>POST /api/users/login</h3>
<ul>
Requires
  <li>String email</li>
  <li>String password</li>
  Gives user valid auth-token
</ul>

<h3>GET /api/users/getUserInfo/:id</h3>
<ul>
Requires
  <li>Valid auth-token</li>
  Outputs: fullName, profileType
</ul>

<h3>PUT /api/users/addFriend/:id</h3>
<ul>
Requires
  <li>Valid auth-token</li>
  Add's given user ID to token user's ID
</ul>

<h3>POST /api/userpost/newPost</h3>
<ul>
Requires
  <li>Valid auth-token</li>
  <li>String message</li>
  <li>String[] tags</li>
  Not Required
  <li>Int Price</li>
  Creates a new post
</ul>

<h3>GET /api/userpost/getMessage/:id</h3>
<ul>
Requires
  <li>Valid auth-token</li>
  Outputs message information
</ul>


<h3>GET /api/home/newsFeed/messages</h3>
<ul>
Requires
  <li>Valid auth-token</li>
  Currently, outputs array of all friends' post
</ul>

