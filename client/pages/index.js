import buildClient from "../api/build-client";

//use can only use hooks in components
const LandingPage = ({ currentUser }) => {
  console.log('cU: ', currentUser)
  return currentUser ? <h1>You are signed in </h1> : <h1>You are not signed in</h1>
}

LandingPage.getInitialProps = async (context) => {
  console.log('landing page');
  const { data } = await buildClient(context).get('/api/users/currentuser');
  return data;
}

export default LandingPage;