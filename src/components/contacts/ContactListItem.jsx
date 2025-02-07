import { useDeleteContactsMutation } from '../../redux/contacts/contacts-operation';
import { ThreeDots } from 'react-loader-spinner';

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
          {isDeleting ? <ThreeDots height="20" width="20" /> : 'Delete'}
        </button>
      </li>
    </>
  );
};

export default ContactListItem;
