import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Article(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>This Is The Full Article View</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi sit
          amet mauris commodo quis imperdiet massa tincidunt. Mauris sit amet
          massa vitae tortor. Sed lectus vestibulum mattis ullamcorper velit sed
          ullamcorper morbi. Arcu risus quis varius quam quisque id diam vel
          quam. Lacus suspendisse faucibus interdum posuere lorem. Vivamus arcu
          felis bibendum ut tristique. Porttitor eget dolor morbi non arcu risus
          quis varius quam. Vitae elementum curabitur vitae nunc sed velit
          dignissim sodales.
          <br />
          <br />
          Id aliquet risus feugiat in ante metus. Platea dictumst quisque
          sagittis purus sit amet volutpat. Eu ultrices vitae auctor eu augue ut
          lectus arcu bibendum. Consectetur adipiscing elit pellentesque
          habitant morbi tristique. Senectus et netus et malesuada. Elit
          scelerisque mauris pellentesque pulvinar pellentesque. Amet porttitor
          eget dolor morbi non arcu risus quis. Etiam sit amet nisl purus.
          Tellus mauris a diam maecenas sed enim ut. Fermentum dui faucibus in
          ornare. Suspendisse ultrices gravida dictum fusce ut placerat orci
          nulla. Sit amet risus nullam eget felis eget nunc lobortis. Quis ipsum
          suspendisse ultrices gravida dictum fusce. Porttitor massa id neque
          aliquam. Ultricies integer quis auctor elit. Porta non pulvinar neque
          laoreet suspendisse interdum consectetur libero id. Sed faucibus
          turpis in eu mi. Tempor orci eu lobortis elementum nibh tellus
          molestie nunc. Amet commodo nulla facilisi nullam. Sapien faucibus et
          molestie ac feugiat sed lectus. Turpis massa sed elementum tempus
          egestas.
          <br />
          <br />
          Eu turpis egestas pretium aenean pharetra magna ac placerat. Mattis
          molestie a iaculis at erat pellentesque adipiscing commodo. Vitae et
          leo duis ut diam quam nulla porttitor massa. Pulvinar etiam non quam
          lacus suspendisse. Maecenas sed enim ut sem viverra. Purus gravida
          quis blandit turpis cursus in hac habitasse platea. Vitae purus
          faucibus ornare suspendisse sed nisi. Est ultricies integer quis
          auctor elit sed vulputate mi. Nulla facilisi cras fermentum odio eu.
          Viverra adipiscing at in tellus integer. Dictumst quisque sagittis
          purus sit amet volutpat consequat mauris nunc. Id neque aliquam
          vestibulum morbi blandit cursus. Elit scelerisque mauris pellentesque
          pulvinar pellentesque habitant. Pulvinar sapien et ligula ullamcorper
          malesuada proin libero nunc consequat. Enim ut tellus elementum
          sagittis vitae et. In tellus integer feugiat scelerisque varius.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Article;
