  

# TourBuddy
Tour Buddy is an online-based travel guide hiring management system WebApp that helps tourists hire their preferred tour guides to visit desired destinations. Users can also register as local/tour guides to showcase the scenic beauty and history of their beloved local places.



  

## Team members
<table>
	 <thead> 
		 <tr> 
			 <th>ID</th> 
			 <th>Name</th> 
			 <th>Email</th> 
			 <th>Role</th> 
		 </tr> 
	 </thead> 
	 <tbody> 
		 <tr> 
			 <td>20220104040</td> 
			 <td>Ahnaf Amer</td> 
			 <td>ahnafamer15@gmail.com</td> 
			 <td>Lead (Frontend+Backend)</td> 
		 </tr> 
		 <tr> 
			 <td>20220104027</td> 
			 <td>Khaled Hasan Ratin</td> 
			 <td>Khaled.cse.20220104027@aust.edu</td> 
			 <td>Backend</td>   
		 </tr> 
		 <tr> 
			 <td>20220104026</td> 
			 <td>Tasfia Jannat</td> 
			 <td>tasfia.cse.20220104026@aust.edu</td> 
			 <td>Frontend</td>   
		 </tr> 
		 
	 </tbody> 
 </table>

  

## Target Audience

  

The target audience for "Tour Buddy"  tour guide hiring management system is the tourists itself. As Bangladesh is a country of green lands and scenic beauty,there is a lot of places a tourist can visit and enjoy.Our platform provides a tourist to choose or hire their preferred tourguides for their desired tour places .Also user can select tour packages according to tour guides and their preferences.

  
  

## Tech Stack
<table>
	 <thead> 
		 <tr> 
			 <th>Teck Stack</th> 
			 <th>We Use</th> 
		 </tr> 
	 </thead> 
	 <tbody> 
		 <tr> 
			 <td>Backend</td> 
			 <td>Laravel</td> 
		 </tr> 
		 <tr> 
			 <td>Frontend</td> 
			 <td>React,Tailwind UI</td>   
		 </tr> 
		 <tr> 
			 <td>Database</td> 
			 <td>My SQL</td>  
		 </tr> 
		 <tr> 
			 <td>Payment Process</td> 
			 <td>Stripe</td> 
		 </tr> 
		 <tr> 
			 <td>Rendering Method</td> 
			 <td>CSR (Client-Side Rendering)</td> 
		 </tr> 
	 </tbody> 
 </table>
  
## UI Design

Figma Design   : <a href="https://www.figma.com/design/YEUU6Z9rRieZgL7QO0mH3s/Tour-Buddy?node-id=37-2&t=8YnxkUuVlcFhxRGr-1">Figma Design Link</a>


## Project Features

### User/Tourist Section
<ul>
	<li>Multi User Authentication</li>
	<li>Tour Packages, Gallery</li>
	<li>CRUD operations</li>
	<li>Search/Filter</li>
	<li>Provide Review,Rating</li>
	<li>Profile</li>
	<li>Apply Online Payment</li>
</ul>

### Tour Guide Section
<ul>
	<li>Multi Tour Guide Authentication</li>
	<li>Online Payment,Profile</li>
	<li>CRUD operations</li>
	
	
</ul>

### Admin Section
<ul>
	<li> Admin Authentication</li>
	<li>Forget Password</li>
	<li>Admin Panel</li>
	<li>Manage Tour Guide</li>
	
</ul>

##  API Endpoints
### **Authentication**

#### User Authentication

-   **POST** `/api/register` - User registration.
-   **POST** `/api/login` - User login.
-   **POST** `/api/logout` - User logout.

#### Tour Guide Authentication

-   **POST** `/api/tour_guides/register` - Tour Guide registration.
-   **POST** `/api/tour_guides/login` - Tour Guide login.
-   **POST** `/api/tour_guides/logout` - Tour Guide logout.


#### Admin Authentication

-   **POST** `/api/admin/login` - Admin login.
-   **POST** `/api/admin/logout` - Admin logout.

----------


### **Tour Guide Management**

#### By Tour Guide
-   **GET** `/api/tour_guides` - Fetch tourguide details (Tour Guide Account).
-   **PUT** `/api/tour_guides/` - Update tourguide account details.
-   **DELETE** `/api/tour_guide/me` - Delete tourguide account.
-   **PATCH** `/api/tour_guides/profile'` - Update tourguide profile.
-   **POST** `/api/tour_guide/profiles` - Add a profile.

#### By Admin

-   **GET** `/api/tourguide` - Fetch all tourguides.
-   **PATCH** `/api/tourguide/:tourguideId/approve` - Approve tourguide registration.
-   **DELETE** `/api/tourguide/:tourguideId` - Remove tourguide.

----------


#### Payment Options


-   **POST** `/api/payments/online` - Apply online payment (e.g., via bKash, card).
-   **POST** `/api/payments/verify/:paymentId` - Verify online payment.


----------

### **Admin Panel Management**

-   **GET** `/api/admin/dashboard` - Admin dashboard data (e.g., total tourguides, active tourguides,user ratings and review,payments).
-   **GET** `/api/admin/users` - Fetch all users.
-   **GET** `/api/tour_guides` - Fetch all tourguides.
-   **DELETE** `/api/tourguide/:tourguideId` - Remove tourguide.



----------

### **Search and Filtering**

-   **GET** `/api/language/search` - Search TourGuides by desired language.
-   **GET** `/api/duration/search` - Search TourGuides by preferred duration.
-   **GET** `/api/destination/search` - Search TourGuides by desired destination.


-   **GET** `/api/description/search` - Search Packages by desired description.
-   **GET** `/api/duration/search` - Search  Packages by preferred duration.
-   **GET** `/api/destination/search` - Search  Packages by desired destination.



----------

### **Reviews and Ratings**

-   **POST** `/api/reviews` - Add a review for a tour package.
-   **POST** `/api/reviews` - Add a review for a tour guide.
-   **GET** `/api/reviews/:tourguideId` - Fetch reviews for tourguides.
-   **PATCH** `/api/reviews/:reviewId` - Edit a review.
-   **DELETE** `/api/reviews/:reviewId` - Delete a review.

## Milestones
<table>
	 <thead> 
		 <tr>  
			 <th>Milestones</th> 
			 <th>We Cover</th> 
		 </tr> 
	 </thead> 
	 <tbody> 
		 <tr> 
			 <td>Checkpoint 1</td> 
			 <td>
				 <ul>
					 <li>Frontend, Backend, Database setup</li>
					<li>User/Tourist registration and login pages</li>
					<li>User/Tourist authentication</li>
					<li>User responsive HomePage, Gallery</li>
					<li>Table for User at Database,User Profile</li>
					<li>User/Tour Guide authentication and base Profile Page</li>
				</ul>
			</td>
		 </tr> 
		 <tr> 
			 <td>Checkpoint 2</td> 
			 <td>
				 <ul>
					 <li>Introduce Packages in Home Page</li>
					 <li>Packages review and rating page</li>
					 <li>Search and filtering option for tourguide and packages</li>
					 <li>Full fleged Profile Pages for both Tourist and Tour Guide</li>
					 <li>Rating/Review option for tour guide</li>
				 </ul>
			 </td>   
		 </tr> 
		 <tr> 
			 <td>Checkpoint 3</td> 
			 <td><ul>
					 <li>Admin Authentication</li>
					 <li>Admin Profile</li>
					 <li>Admin can remove inactive or low rating and bad reviewed tourguides</li>
					 <li>Payment option</li>
					 <li>Approve or Reject tourguide registration and handle users by Admin</li>
				 </ul>
				</td>  
		 </tr> 
	 </tbody> 
 </table>

