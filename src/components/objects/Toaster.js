import { Toaster, toast } from 'react-hot-toast';

const Toaster = ()=> {
  return (
    <div>
      <Toaster 
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      {/* Your other components */}
    </div>
  );
}

function ExampleComponent() {
  const notify = () => toast('Customized toast!', {
    duration: 4000,
    position: 'top-right',
    // Custom styling
    style: {
      background: '#333',
      color: '#fff',
    },
    // Additional options
    icon: '👏',
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  });

  return (
    <div>
      <button onClick={notify}>Show Customized Toast</button>
    </div>
  );
}

export default Toaster;