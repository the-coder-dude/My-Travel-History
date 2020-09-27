import React, {useState} from "react";
import { useForm } from "react-hook-form";

import { createTravelEntry } from "./API";

const EnterTravelHistory = ({location, onClose}) => {

    const [loading, setLoading]= useState(false);
    const [error, setError] = useState('');

  // eslint-disable-next-line
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
        setLoading(true);  
        data.latitude = location.latitude;
        data.longitude = location.longitude;
      const created = await createTravelEntry(data);
      console.log(created);
      onClose();
    } catch (error) {

        console.log(error);
        setError(error.message);
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
       { error ? <h3 className= "error">{error}</h3>: null}
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />

      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>

      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={1} ref={register}></textarea>

      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />

      <label htmlFor="rating">Rating</label>
      <textarea name="rating" ref={register}></textarea>

      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />

      <button disabled={loading}>{loading? 'Loading! Please wait 😊':'Submit Location Details'}</button>
    </form>
  );
};

export default EnterTravelHistory;
