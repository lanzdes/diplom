import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useSearchParams, useParams, useLocation } from 'react-router-dom';

import styled from 'styled-components';

interface IFilm {
  author: number;
  date: string;
  id: number;
  image: string;
  lesson_num: number;
  text: string;
  title: string;
}

export const FilmPage = () => {
  // const [sendedUser, setSendedUser] = useState(false);

  const [film, setFilm] = useState<IFilm>();

  const params = useParams();

  useEffect(() => {
    const id = params?.filmID;
    if (id) {
      fetch(`https://studapi.teachmeskills.by/blog/films/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          setFilm(data);
        });
    }
  }, [params?.filmID]);

  //  // console.log(films);
  return (
    // <FormTemplate title="Sign in">
    <>
      Films
      <List>
        <Li>
          {film?.date} - {film?.title}
        </Li>
        {/* {films?.results?.map(({ date, title, id }) => (
          <Li key={id}>
            {date} - {title}
          </Li>
        ))} */}
      </List>
    </>
    // </FormTemplate>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul``;

const Li = styled.li``;
