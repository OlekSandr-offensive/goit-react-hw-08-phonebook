import React from 'react';
import { useSelector } from 'react-redux';
import {
  useFetchContactsQuery,
  useDeleteContactsMutation,
} from '../../redux/contacts/contacts-slice';
import { Watch } from 'react-loader-spinner';
import { getFilters } from '../../redux/contacts/filters-selectors';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './ContactList.css';
import PropTypes from 'prop-types';

const ContactList = () => {
  const { data = [], isFetching } = useFetchContactsQuery();
  const [deleteContacts] = useDeleteContactsMutation();

  const filter = useSelector(getFilters).toLowerCase();

  const getFilteredContacts = () => {
    return data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  // contacts.filter(({ name }) => name.toLowerCase().includes(filters));
  // const filtered = contacts ? getFilteredContacts(contacts) : [];

  return (
    <>
      <ul className="ContactList">
        {getFilteredContacts().map(({ id, name, number }) => (
          <li key={id}>
            <p>
              {name}:<span>{number}</span>
            </p>
            <button type="button" onClick={() => deleteContacts(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {isFetching === true && (
        <Watch height="100" width="100" color="teal" ariaLabel="loading" />
      )}
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
