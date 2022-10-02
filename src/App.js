import React, { useEffect, useState } from 'react';
import { Collection } from './Collection';
import './index.scss';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]


function App() {

  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {

    const category = categoryId ? `category=${categoryId}` : '';

    setIsLoading(true)
    fetch(`https://633964ab383946bc7ff270ea.mockapi.io/photo-collections?page=${page}&limit=3&${category}`)
    .then(res => res.json())
    .then(json => {
      setCollections(json);
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка при получении данных')
    })
    .finally(() => setIsLoading(false))
  }, [categoryId, page])

  
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) => <li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>)
          }
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          isLoading ? (
            <h2>Идёт загрузка...</h2>
          ) : (
            collections.filter(obj => {
              return obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase());
            }).map((obj, id)=> (
              <Collection
                key={id}
                name={obj.name}
                images={obj.photos}
              />
            ))
          )
        }
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
