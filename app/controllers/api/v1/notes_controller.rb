# frozen_string_literal: true

module Api
  module V1
    # NotesController
    class NotesController < ApplicationController
      before_action :authenticate_user

      def index
        render json: {
          notes: current_user.notes
        }
      end
    end
  end
end
