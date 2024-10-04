import { Note } from "../models/note";
import { User } from "../models/user";
import { Lesson } from "../models/lesson";
import { Event } from "../models/event";
import { Food } from "../models/food"

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser() : Promise<User> {
    const response = await fetchData("/api/users", { method: "GET"});
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(credentials)
        }
    )
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}

//--------------------------------------------------------------------------

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData('/api/notes' , { method: 'GET'}); 
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string
}

export async function createNote(note: NoteInput) : Promise<Note> {
    const response = await fetchData("/api/notes",
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(note),
        }
    )
    return response.json();
}

export async function updateNote(noteId: string, note: NoteInput) : Promise<Note> {
    const response = await fetchData("/api/notes/" + noteId,
        {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(note),
        });
        return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, { method: "DELETE"});
}

//-------------------------------------------------------------------------
export async function fetchLesson(): Promise<Lesson[]> {
    const response = await fetchData('/api/lessons' , { method: 'GET'}); 
    return response.json();
}

export interface LessonInput {
    day?: string,
    lessonName?: string,
    hour?: string
}


export async function createLesson(lesson: LessonInput) : Promise<Lesson> {
    const response = await fetchData("/api/lessons",
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(lesson),
        }
    )
    return response.json();
}


export async function updateLesson(lessonId: string, lesson: LessonInput) : Promise<Lesson> {
    const response = await fetchData("/api/lessons/" + lessonId,
        {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(lesson),
        });
        return response.json();
}

export async function deleteLesson(lessonId: string) {
    await fetchData("/api/lessons/" + lessonId, { method: "DELETE"});
}

//------------------------------------------------------------------------------
export async function fetchEvent(): Promise<Event[]> {
    const response = await fetchData('/api/events' , { method: 'GET'}); 
    return response.json();
}

export interface EventInput {
    title: string,
    text?: string
}

export async function createEvent(event: EventInput) : Promise<Event> {
    const response = await fetchData("/api/events",
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(event),
        }
    )
    return response.json();
}

export async function updateEvent(eventId: string, event: EventInput) : Promise<Event> {
    const response = await fetchData("/api/events/" + eventId,
        {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(event),
        });
        return response.json();
}

export async function deleteEvent(eventId: string) {
    await fetchData("/api/events/" + eventId, { method: "DELETE"});
}



//------------------------------------------------------------------------------

export async function fetchFood(): Promise<Food[]> {
    const response = await fetchData('/api/foods' , { method: 'GET'}); 
    return response.json();
}

export interface FoodInput {
    day?: string,
    foodName?: string
}


export async function createFood(food: FoodInput) : Promise<Food> {
    const response = await fetchData("/api/foods",
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(food),
        }
    )
    return response.json();
}


export async function updateFood(foodId: string, food: FoodInput) : Promise<Food> {
    const response = await fetchData("/api/foods/" + foodId,
        {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(food),
        });
        return response.json();
}

export async function deleteFood(foodId: string) {
    await fetchData("/api/foods/" + foodId, { method: "DELETE"});
}