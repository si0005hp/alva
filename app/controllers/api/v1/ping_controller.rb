# frozen_string_literal: true

module Api
  module V1
    # PingController
    class PingController < ApplicationController
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
    end
  end
end
