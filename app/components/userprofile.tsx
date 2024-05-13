"use client"
export default function Userprofile(props: any) {
    return (
    <>
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={'http://localhost:3000/admin/getimage/' + props.Admin.profilepic} width={400} /></figure>
            <div className="card-body">
                <h2 className="card-title">ID: {props.Admin.name}</h2>
                Name:  {props.Admin.name} <br />
                username:  {props.Admin.username}<br />
                address:  {props.Admin.address}<br />
                <div className="card-actions justify-end">
                <button className="btn btn-error">Delete</button>
                    <button className="btn btn-warning">Update</button>
                </div>
            </div>
            </div>
    </>
    );
}