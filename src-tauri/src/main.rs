#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::{Deserialize, Serialize};
use std::env;
use std::fs::{File, OpenOptions};
use std::io::{Read, Write};
use std::path::PathBuf;

// Define the structure for a note
#[derive(Serialize, Deserialize, Clone)]
struct Note {
    id: String,
    content: String,
}

// Get the appropriate file path based on the environment (development or production)
fn get_file_path() -> PathBuf {
    if env::var("TAURI_DEV").is_ok() {
        // In development mode, use a separate file path outside the watched directories
        PathBuf::from("./notes-dev.json")
    } else {
        // In production, use the default path
        PathBuf::from("notes.json")
    }
}

// Save notes to the local file system
#[tauri::command]
fn save_notes(notes: Vec<Note>) -> Result<(), String> {
    let file_path = get_file_path(); // Get file path based on the environment

    // Convert notes to JSON format
    let json_data = serde_json::to_string(&notes)
        .map_err(|e| format!("Error serializing notes: {}", e))?;

    // Open the file for writing and truncate existing content
    let mut file = OpenOptions::new()
        .create(true)
        .write(true)
        .truncate(true)
        .open(file_path)
        .map_err(|e| format!("Error opening file for writing: {}", e))?;

    // Write the JSON data to the file
    file.write_all(json_data.as_bytes())
        .map_err(|e| format!("Error writing to file: {}", e))?;

    Ok(())
}

// Load notes from the local file system
#[tauri::command]
fn load_notes() -> Result<Vec<Note>, String> {
    let file_path = get_file_path(); // Get file path based on the environment

    // Open the file for reading
    let mut file = File::open(file_path).map_err(|_| "Could not open notes file".to_string())?;
    
    let mut json_data = String::new();
    
    // Read the file content into a string
    file.read_to_string(&mut json_data)
        .map_err(|e| format!("Error reading file: {}", e))?;

    // If the file is empty, return an empty list of notes
    if json_data.is_empty() {
        return Ok(Vec::new());
    }

    // Deserialize the JSON data back into a Vec<Note>
    let notes: Vec<Note> = serde_json::from_str(&json_data)
        .map_err(|e| format!("Error deserializing notes: {}", e))?;

    Ok(notes)
}

fn main() {
    tauri::Builder::default()
        // Register the Tauri commands
        .invoke_handler(tauri::generate_handler![save_notes, load_notes])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
