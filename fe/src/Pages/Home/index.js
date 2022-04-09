import { Link } from 'react-router-dom';

import {
  Container,
  InputSearchContainer,
  Header,
  ListContainer,
  Card,
} from './style';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>3 Contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>João Pedro Luz</strong>
              <small>Instagram</small>
            </div>
            <span>joao.pedro.luz@hotmail.com</span>
            <span>4002-8922</span>
          </div>
          <div className="actions">
            <Link to="/edit/1">
              <img src={edit} alt="Edit" />
              <button type="button">
                <img src={trash} alt="Delete" />
              </button>
            </Link>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}

fetch('http://localhost:3001/contacts')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
