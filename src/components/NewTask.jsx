import '../styles/Formfull.css';

function NewTask({ cancelForm }) {
  return (
    <div className="full-container">
      <form className="form-newtask">
        <h2>Nova Task</h2>
        <input type="text" placeholder="Título" />
        <textarea placeholder="Detalhes" cols="30" rows="10"></textarea>
        <div>
          <button className="btn-cancel" onClick={ cancelForm }>Cancelar</button>
          <button className="btn-add">Adicionar</button>
        </div>
      </form>
    </div>
  )
}

export default NewTask;
