import NavBar from "./NavBar"

type Props = {
    content: JSX.Element
}

const Skeleton = ({content}: Props) => {

    return (
        <div style={{minWidth: '100%'}}>
            <NavBar/>
            <br style={{marginTop:"20%"}}/>
            {content}
        </div>
    )

}

export default Skeleton;