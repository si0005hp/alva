# frozen_string_literal: true

module Api
  module V1
    # PingController
    class PingController < ApplicationController
      before_action :authenticate_user, only: %i[show]

      def index
        render json: {
          message: '[GET]: Pong'
        }
      end

      def create
        render json: {
          message: '[POST]: Pong'
        }
      end

      def show
        render json: {
          message: '[AUTH]: Pong'
        }
      end
    end
  end
end
