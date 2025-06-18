import { getSurveys } from "../../survey.service";
import Link from "next/link";

export default async function SurveyPage() {
  const surveys = await getSurveys();
  const firstSurvey = surveys[0];

  return (
    <main className="flex flex-1 items-center justify-center">
      <section className="bg-white rounded-xl shadow-md p-8 sm:p-12 max-w-xl w-full flex flex-col items-center border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center font-sans text-gray-900">
          {firstSurvey ? firstSurvey.title : "No survey found"}
        </h2>
        <p className="text-base sm:text-lg text-center mb-4 font-sans text-gray-900">
          {firstSurvey ? firstSurvey.description : "No description available."}
        </p>
        <p className="text-base text-center mb-8 font-sans text-gray-900">
          This survey takes approximately <span className="font-semibold">5-10 minutes</span> to complete.
        </p>
        {/* The survey questions will be loaded here in the next step */}
        {firstSurvey && (
          <Link
            href={`/survey/${firstSurvey.id}`}
            className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition-colors duration-200 text-center"
          >
            Start Survey
          </Link>
        )}
        <p className="text-xs text-gray-400 text-center font-sans">
          Your information is secure and will only be used to provide personalized care recommendations. See our{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
      </section>
    </main>
  );
}
