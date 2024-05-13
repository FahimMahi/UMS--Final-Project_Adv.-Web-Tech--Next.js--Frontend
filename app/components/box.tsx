export default function Box(props: any) {
    return (
      <div className="bg-gray-100 p-4 max-w-sm mx-auto rounded-lg shadow-md">
        <div className="p-4 bg-white rounded-md shadow">
          <h1 className="text-xl font-bold text-center">{props.text}</h1>
        </div>
      </div>
    );
}
  