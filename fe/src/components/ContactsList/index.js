import { Container, Header, ListContainer, Card } from './style';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 Contatos</strong>
        <a href="/">Novo contato</a>
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
            <a href="/">
              <img src={edit} alt="Edit" />
              <button type="button">
                <img src={trash} alt="Delete" />
              </button>
            </a>
          </div>
        </Card>
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
            <a href="/">
              <img src={edit} alt="Edit" />
              <button type="button">
                <img src={trash} alt="Delete" />
              </button>
            </a>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
