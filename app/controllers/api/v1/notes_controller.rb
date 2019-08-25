# frozen_string_literal: true

module Api
  module V1
    # NotesController
    class NotesController < ApplicationController
      before_action :authenticate_user

      def index
        render json: { notes: current_user.notes.order('updated_at DESC') }
      end

      def update
        note.update!(note_params)
        render json: { note: note }, status: :ok
      end

      def create
        note = Note.create!(title: note_params[:title],
                            body: note_params[:body],
                            user: current_user)
        render json: { note: note }, status: :ok
      end

      def destroy
        note.destroy!
        render json: { note: note }, status: :ok
      end

      private

      def note
        @note ||= Note.find(params[:id])
      end

      def note_params
        params.permit(:id, :title, :body)
      end
    end
  end
end
