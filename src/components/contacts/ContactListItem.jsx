import { useDeleteContactsMutation } from '../../redux/contacts/contacts-operation';
import { Watch } from 'react-loader-spinner';

const ContactListItem = ({ _id, name, phone }) => {
  const [deleteContacts, { isLoading: isDeleting }] =
    useDeleteContactsMutation();
  return (
    <>
      <li>
        <p>
          {name}:<span>{phone}</span>
        </p>
        <button
          type="button"
          onClick={() => deleteContacts(_id)}
          disabled={isDeleting}
          className="deleteButton"
        >
          {isDeleting && <Watch height="10" width="10" />}
          Delete
        </button>
      </li>
    </>
  );
};

export default ContactListItem;
