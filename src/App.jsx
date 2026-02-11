import { useEffect, useState } from 'react';
import { Atom } from 'react-loading-indicators';
import SpotlightCard from './components/SpotlightCard';

export default function App() {
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(false);
  const [style, setStyle] = useState('comedy');

  useEffect(() => {
    setLoader(true);
    fetch(`https://jsonbek.uz/api/comments?style=${style}`)
      .then((res) => res.json())
      .then((res) => {
        setState(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [style]);

  if (loader) {
    return (
      <button className="w-full fixed h-screen overflow-hidden">
        <Atom color="#030303" size="medium" text="" textColor="" />;
      </button>
    );
  }

  function handleChange(evt) {
    return setStyle(evt.target.value);
  }

  return (
    <>
      <div className="max-w-[1140px] w-full mx-auto py-10 px-4">
        <div className="mb-10">
          <select onChange={handleChange} className='border rounded-2xl py-1' value={style}>
            <option value="comedy">Comediya</option>
            <option value="adventure">Sarguzasht</option>
            <option value="romance">Ramantika</option>
            <option value="drama">Dramma</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {state.map((el) => (
            <SpotlightCard
              key={el.id}
              className="w-[320px] min-h-[220px] flex flex-col gap-4 hover:scale-105 transition duration-300"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <h2 className="text-xl font-bold text-cyan-400">{el.name}</h2>

              <p className="text-sm text-gray-400 break-words">{el.email}</p>

              <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">{el.body}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </>
  );
}
