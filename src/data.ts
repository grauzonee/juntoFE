import event_example from "/event_example.jpg"
import avatar_placeholder from "/avatar-placeholder.png"

const sampleAuthor = {
    id: "699d5e6b6a4c8dd863939258",
    username: "Yoga Club",
    description: "Community-led movement sessions in the park.",
    email: "yogaclub@example.com",
    avatarUrl: avatar_placeholder,
    interests: ["Fitness", "Wellbeing"],
    createdAt: new Date("2026-02-24T08:16:44.073Z"),
}

export const event = {
    location: {
        type: "Point",
        coordinates: [
            -122.4862,
            37.7694
        ]
    },
    fee: {
        amount: 10,
        currency: "EUR"
    },
    _id: "699d5e6c6a4c8dd863939276",
    title: "Weekend Yoga in the Park",
    description: "Relaxing outdoor yoga session suitable for all levels.",
    date: "+057137-02-12T00:00:00.000Z",
    fullAddress: "Golden Gate Park, San Francisco, CA, USA",
    imageUrl: event_example,
    categories: [
        {
            id: "123",
            title: "Fitness"
        },
        {
            id: "123",
            title: "Wellbeing"
        },
    ],
    author: sampleAuthor,
    maxAttendees: 50,
    active: true,
    type: {
        id: "123",
        title: "Sport activity"
    },
    createdAt: "2026-02-24T08:16:44.073Z"
}

export const comment = {
    id: "123456",
    author: sampleAuthor,
    content: "This event looks amazing!",
    event,
    createdAt: "2026-02-24T08:17:00.000Z"
}
