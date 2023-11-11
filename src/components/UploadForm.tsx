import axios from 'axios';
import React, { FormEvent, SyntheticEvent, useState } from 'react';

export default function UploadForm() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
      
    await axios.post('http://localhost:3001/api/test', formData)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        // Handle errors
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col">
        <input
          type="text"
          name="title" 
          className="border rounded-lg border-black m-3 p-2"
        />
        <input
          type="text"
          name="description" 
          className="border rounded-lg border-black m-3 p-2"
        />
        <input
          type="text"
          name="size" 
          className="border rounded-lg border-black m-3 p-2"
        />
        <input
          type="text"
          name="brand" 
          className="border rounded-lg border-black m-3 p-2"
        />
        <input
          type="text"
          name="item_condition" 
          className="border rounded-lg border-black m-3 p-2"
        />
        <input
          type="text"
          name="price" 
          className="border rounded-lg border-black m-3 p-2"
        />
        <input
          type="text"
          name="category_id" 
          className="border rounded-lg border-black m-3 p-2"
        />
        <input
          type="file"
          name="images" 
          multiple
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
