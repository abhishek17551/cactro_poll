## API Endpoints
- `POST /polls`: Create a new poll.
- `GET  /polls`: Get all polls.
- `GET  /polls/:id`: Get single poll.
- `POST /polls/:id/vote`: Vote on a poll.

## Database Schema
```javascript
const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
},
{
    timestamps: true
}
);
