import SurveyQuestionFlow from "../../../components/organisms/SurveyQuestionFlow";
import { getSurveyById } from "../../../survey.service";
import { notFound } from "next/navigation";

export default async function SingleSurveyPage({ params }: { params: { surveyId: string } }) {
  const survey = await getSurveyById(params.surveyId);
  if (!survey) return notFound();
  const questions = survey.questions || [];

  return (
    <main className="flex flex-1 items-center justify-center">
      <section className="bg-white rounded-xl shadow-md p-8 sm:p-12 max-w-xl w-full flex flex-col items-center border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center font-sans text-gray-900">{survey.title}</h2>
        <p className="text-base sm:text-lg text-center mb-4 font-sans text-gray-900">{survey.description}</p>
        <SurveyQuestionFlow questions={questions} />
      </section>
    </main>
  );
}
