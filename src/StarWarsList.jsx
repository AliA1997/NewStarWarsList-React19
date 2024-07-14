import { use } from "react";

function StarWarsList({ starWarsPromise }) {
  // Use the use() function to resolve asyunchronous data retrieval.
  const { results: starWarsPeople } = use(starWarsPromise);
    console.log('starWarsPeople', starWarsPeople)
  return (
    <>
      {starWarsPeople &&
        starWarsPeople.map((people, peopleIdx) => (
          <div key={peopleIdx} style={{ width: "33%" }}>
            <h5>{people.name}</h5>
          </div>
        ))}
    </>
  );
}

export default StarWarsList;
