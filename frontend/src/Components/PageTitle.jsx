/* eslint-disable react/prop-types */

const PageTitle = ({ title }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-xl font-bold text-gray-900">{title} Page</h1>
        </div>
    )
}

export default PageTitle

