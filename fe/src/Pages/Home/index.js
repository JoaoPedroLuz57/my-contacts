/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { Button } from '../../components/Button';

import { contactsService } from '../../services/ContactsService';

import {
  Container,
  InputSearchContainer,
  Header,
  EmptyListContainer,
  ErrorContainer,
  SearchNotFoundContainer,
  ListHeader,
  Card,
} from './style';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [seachTerm, setSeachTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => (
      contact.name.toLowerCase().includes(seachTerm.toLowerCase())
    ))), [contacts, seachTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await contactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleTryAgain() {
    loadContacts();
  }

  function handleToggleOrderBy() {
    setOrderBy(((prevState) => (prevState === 'asc' ? 'desc' : 'asc')));
  }

  function handleChangeSearchTerm(event) {
    setSeachTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={seachTerm}
            type="text"
            placeholder="Pesquise pelo nome..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      ) }

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />

              <p>
                Voc?? ainda n??o tem nenhum contato cadastrado!
                Clique no bot??o <strong>&ldquo;Novo contato&rdquo;</strong> ?? cima
                para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />

              <span>
                Nenhum contato foi encontrado para <strong>&ldquo;{seachTerm}&rdquo;</strong>.
              </span>
            </SearchNotFoundContainer>

          )}

          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                  <small>{contact.category_name}</small>)}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                  <button type="button">
                    <img src={trash} alt="Delete" />
                  </button>
                </Link>
              </div>
            </Card>
          ))}
        </>
      )}

    </Container>
  );
}
