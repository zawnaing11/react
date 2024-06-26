import React, { useState, useEffect} from 'react'
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err))

  }, [term]);

  return (
    <div className="App">
      <div className='container mx-auto'>

        {
          isLoading
          ?
          <h1 className='text-6xl text-center mx-auto mt-32'>Loading . . .</h1>
          :
          <div>
            <ImageSearch searchText={(text) => setTerm(text)}/>
            {
              (images.length === 0 && <h1 className='text-6xl text-center mx-auto mt-32'>No Image Found</h1>)
            }
            <div className='grid grid-cols-3 gap-4'>
              {
                images.map((image) => (<ImageCard key={image.id} image={image}/>))
              }
            </div>
          </div>

        }
      </div>
    </div>
  );
}

export default App;
