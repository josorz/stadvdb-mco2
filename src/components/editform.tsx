'use client'
import { useRouter } from "next/navigation";

const EditForm = ({ data }: {data: any}) => {
  const { push } = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const request = Object.fromEntries(formData.entries());
    
    fetch(`/api/edit/${data.AppID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then((res) => res.json())
    .then(( { success } ) => {
      if (success) {
        push('/')
      }
    })
  };
  
  const handleDelete = async (e: any) => {
    e.preventDefault()
    fetch(`/api/edit/${data.AppID}`, {
      method: 'DELETE'
    }).then((res) => res.json())
    .then(( { success } ) => {
      if (success) {
        push('/')
      }
    })
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit AppID {data.AppID}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <button
              type="submit"
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Update
          </button>
          <button
              type="button"
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={handleDelete}
            >
              Delete
          </button>
        </div>
        {/* AppID */}
        <div className="flex space-x-4">
          {/* Name */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Name</label>
            <input
              name="Name"
              type="text"
              defaultValue={data.Name}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Release Date */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Release Date</label>
            <input
              name="Release_date"
              type="date"
              defaultValue={data.Release_date.split('T', 1)[0]}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Estimated Owners */}
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Estimated Owners</label>
            <input
              name="Estimated_owners"
              type="text"
              defaultValue={data.Estimated_owners}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Peak CCU */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Peak CCU</label>
            <input
              name="Peak_CCU"
              type="number"
              defaultValue={data.Peak_CCU}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Required Age */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Required Age</label>
            <input
              name="Required_age"
              type="number"
              defaultValue={data.Required_age}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Price */}
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Price</label>
            <input
              name="Price"
              type="number"
              step="0.01"
              defaultValue={data.Price}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Discount DLC Count */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Discount DLC Count</label>
            <input
              name="DiscountDLC_count"
              type="number"
              defaultValue={data.DiscountDLC_count}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

        </div>

        <div className="flex flex-col w-full">
            <label className="text-sm font-semibold mb-2">About the Game</label>
            <textarea
              name="About_the_game"
              defaultValue={data.About_the_game}
              className="border border-gray-300 rounded-lg px-3 py-2 h-32"
            ></textarea>
        </div>

        {/* Supported Languages */}
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-semibold mb-2">Supported Languages</label>
            <input
              name="Supported_languages"
              type="text"
              defaultValue={data.Supported_languages}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Full Audio Languages */}
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-semibold mb-2">Full Audio Languages</label>
            <input
              name="Full_audio_languages"
              type="text"
              defaultValue={data.Full_audio_languages}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col w-1/2">
              <label className="text-sm font-semibold mb-2">Reviews</label>
              <input
                name="Reviews"
                type="text"
                defaultValue={data.Reviews}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
          </div>
        
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-semibold mb-2">Header Image</label>
            <input
              name="Header_image"
              type="text"
              defaultValue={data.Header_image}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Full Audio Languages */}
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-semibold mb-2">Website</label>
            <input
              name="Website"
              type="text"
              defaultValue={data.Website}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col w-1/2">
              <label className="text-sm font-semibold mb-2">Support_url</label>
              <input
                name="Support_url"
                type="text"
                defaultValue={data.Support_url}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
          </div>
        
          <div className="flex flex-col w-1/2">
              <label className="text-sm font-semibold mb-2">Support_email</label>
              <input
                name="Support_email"
                type="text"
                defaultValue={data.Support_email}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
          </div>

        </div>

        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="Windows" 
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                defaultChecked={data.Windows}
              />
              <label htmlFor="example" className="text-gray-700">
                Windows
              </label>
          </div>

          <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="Mac" 
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                defaultChecked={data.Mac}
              />
              <label htmlFor="example" className="text-gray-700">
                Mac
              </label>
          </div>
          <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="Linux" 
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                defaultChecked={data.Linux}
              />
              <label htmlFor="example" className="text-gray-700">
                Linux
              </label>
          </div>
        </div>


        {/* Movie Link */}
        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold mb-2">Metacritic</label>
          <input
            name="Metacritic_url"
            type="text"
            defaultValue={data.Metacritic_url}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Additional Fields */}
        <div className="flex space-x-4">
          {/* Metacritic Score */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Metacritic Score</label>
            <input
              name="Metacritic_score"
              type="number"
              defaultValue={data.Metacritic_score}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* User Score */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">User Score</label>
            <input
              name="User_score"
              type="number"
              defaultValue={data.User_score}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Positive Reviews */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Positive Reviews</label>
            <input
              name="Positive"
              type="number"
              defaultValue={data.Positive}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Negative Reviews */}
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Negative Reviews</label>
            <input
              name="Negative"
              type="number"
              defaultValue={data.Negative}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Score Rank */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Score Rank</label>
            <input
              name="Score_rank"
              type="number"
              defaultValue={data.Score_rank}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Achievements */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Achievements</label>
            <input
              name="Achievements"
              type="number"
              defaultValue={data.Achievements}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Recommendations</label>
            <input
              name="Recommendations"
              type="number"
              defaultValue={data.Recommendations}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold mb-2">Notes</label>
            <textarea
              name="Screenshots"
              defaultValue={data.Notes}
              className="border border-gray-300 rounded-lg px-3 py-2 h-32"
            ></textarea>
          </div>
      </div>
        
      <div className="flex space-x-4">
        <div className="flex flex-col w-1/3">
          <label className="text-sm font-semibold mb-2">Average_playtime_forever</label>
          <input
            name="Metacritic_score"
            type="number"
            defaultValue={data.Average_playtime_forever}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* User Score */}
        <div className="flex flex-col w-1/3">
          <label className="text-sm font-semibold mb-2">Average_playtime_two_weeks</label>
          <input
            name="User_score"
            type="number"
            defaultValue={data.Average_playtime_two_weeks}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>
      
      <div className="flex space-x-4">
        <div className="flex flex-col w-1/3">
          <label className="text-sm font-semibold mb-2">Median_playtime_forever</label>
          <input
            name="Metacritic_score"
            type="number"
            defaultValue={data.Median_playtime_forever}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* User Score */}
        <div className="flex flex-col w-1/3">
          <label className="text-sm font-semibold mb-2">Median_playtime_two_weeks</label>
          <input
            name="User_score"
            type="number"
            defaultValue={data.Median_playtime_two_weeks}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>
      

      <div>

          {/* Owner Count */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Owner Count</label>
            <input
              name="Owner_count"
              type="number"
              defaultValue={data.Owner_count}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Discount Price */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Discount Price</label>
            <input
              name="Discount_price"
              type="number"
              defaultValue={data.Discount_price}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Developers</label>
            <input
              name="Developers"
              type="text"
              defaultValue={data.Developers}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Publishers</label>
            <input
              name="Publishers"
              type="text"
              defaultValue={data.Publishers}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Categories</label>
            <input
              name="Categories"
              type="text"
              defaultValue={data.Categories}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Genres</label>
            <input
              name="Developers"
              type="text"
              defaultValue={data.Genres}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col w-1/3">
            <label className="text-sm font-semibold mb-2">Tags</label>
            <input
              name="Categories"
              type="text"
              defaultValue={data.Tags}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        
        {/* Screenshots (Links) */}
        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold mb-2">Screenshots (URLs)</label>
          <textarea
            name="Screenshots"
            defaultValue={data.Screenshots}
            className="border border-gray-300 rounded-lg px-3 py-2 h-32"
          ></textarea>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold mb-2">Movies</label>
          <textarea
            name="Movies"
            defaultValue={data.Movies}
            className="border border-gray-300 rounded-lg px-3 py-2 h-32"
          ></textarea>
        </div>

      </form>
    </div>
  );
};

export default EditForm;
