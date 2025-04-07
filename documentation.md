# Challenge Documentation

_Note: I told AI to clean up and organize my raw thoughts and documentation! This markdown file is result! My messier, original documentation is in `documentation-raw.md`!_

## Frontend Implementation

### Libraries Used

- **Axios**: For API interactions and data fetching
- **Tanstack Query**: For asynchronous data handling
- **Styled-components**: For CSS-in-JS styling

These libraries were chosen based on familiarity and efficiency in development. While Tanstack Query offers additional features like filtering, the current implementation focuses on core functionality.

### Design Decisions

#### Component Structure

- Basic page structure without component abstraction
- Account and Deal cards could be abstracted into separate components with more time
- Frontend filtering implemented for simplicity, though backend filtering would be preferred for larger datasets

#### UI/UX Considerations

- Minimalist design approach
- Horizontal account layout with vertical deal lists
- This layout choice:
  - Maintains logical flow
  - Reduces vertical scrolling
  - Improves readability for users

#### Organization Selection

- Included two organizations for development purposes
- In production, this would likely be redesigned based on specific use cases
- Could support scenarios where users manage multiple organizations

### Running the Frontend

```bash
npm install
npm run dev
```

## Backend Implementation

### Architecture

Implemented a layered architecture for better separation of concerns:

1. **Routes**

   - Handle HTTP request routing
   - Direct requests to appropriate controllers

2. **Controllers**

   - Manage HTTP request/response handling
   - Interface with services

3. **Services**
   - Contain business logic
   - Handle direct database interactions

### Database Choice

- Used SQLite for this challenge
- In production, would prefer a full RDBMS
- Kept original dependencies (Express and better-sqlite3)

### API Design

- Created a consolidated endpoint in organizations service
- Fetches organization details with associated accounts and deals
- Maintained separate services/controllers/routes for reference

### Running the Backend

```bash
npm install
npm run dev:with-seed
```

## Challenge Feedback

### Positive Aspects

- Good screening challenge
- AI usage allowed (important for modern development)
- Emphasis on explaining decisions
- Real-world problem solving

### Areas for Clarification

- "Total value" interpretation (implemented both account and organization totals)
- Organization selection requirements

### Final Thoughts

Thank you for considering me for this role! I appreciate the opportunity to demonstrate my skills and thought process. The challenge provided a good balance of technical requirements and practical decision-making.
